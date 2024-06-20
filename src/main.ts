import { Devvit, Context, TriggerContext } from '@devvit/public-api';
import { ModMail, MessageData } from '@devvit/protos';

const discordWebhookURLs = ['canary.discord.com', 'ptb.discord.com', 'discord.com', 'canary.discordapp.com', 'ptb.discordapp.com', 'discordapp.com'];


Devvit.configure({
  http: true,
  redditAPI: true,
});

Devvit.addSettings([
  {
    type: 'string',
    name: 'webhook',
    label: 'Webhook URL (Discord or Slack)',
  },
]);

Devvit.addTrigger({
  event: 'ModMail',
  onEvent: async (event: ModMail, context: TriggerContext) => {
    try {

      if (!context) {
        throw new Error('Context is probably undefined');
      }

      await sendModMailToWebhook(event, context);
    } catch (error: any) {

      // let's handle errors and log them 
      console.error('There was an error:', error.message);
    }
  },
});

async function sendModMailToWebhook(event: ModMail, context: TriggerContext) {
  try {

    // Retrieve the settings :)
    const webhook = (await context?.settings.get('webhook')) as string;

    if (!webhook) {
      console.error('No webhook URL provided');
      return;
    }

    const conversationId = event.conversationId ?? '';
    const actualConversationId = conversationId.replace('ModmailConversation_', '');
    const result = await context.reddit.modMail.getConversation({
      conversationId: conversationId,
      markRead: false,
    });
    const modmailLink = `https://mod.reddit.com/mail/all/${actualConversationId}`;

    // get the latest message
    const messages = result.conversation?.messages ?? {};
    const messageIds = Object.keys(messages);
    const lastMessageId = messageIds.length > 0 ? messageIds[messageIds.length - 1] : undefined;
    const lastMessage: MessageData | undefined = lastMessageId ? messages[lastMessageId] : undefined;
    // error if no message is found

    if (!lastMessage) {
      console.error('No messages found');
      return;
    }

    const authorName = lastMessage.author?.name ?? 'Unknown';
    const body = lastMessage.bodyMarkdown ?? '';
    const participatingAs = lastMessage.participatingAs ?? 'Unknown';
    const authorProfileLink = `https://www.reddit.com/u/${authorName}`;

    let payload;

    // Check if the webhook is a Slack webhook
    if (webhook.startsWith('https://hooks.slack.com/')) {
      payload = {
        text: `*Modmail Subject:* ${result.conversation?.subject}\n*Author:* ${authorName}\n*Body:* ${body}\n*Participating As:* ${participatingAs}\n*Modmail Link:* ${modmailLink}`,
        attachments: [
          {
            fallback: 'Modmail Details',
            color: '#3498db',
            fields: [
              {
                title: 'Conversation Type',
                value: `${result.conversation?.conversationType}`,
                short: true,
              },
              {
                title: 'Conversation State',
                value: `${result.conversation?.state}`,
                short: true,
              },
              {
                title: 'Participant',
                value: `${result.conversation?.participant?.name}`,
                short: true,
              },
              {
                title: 'Number of Messages',
                value: `${result.conversation?.numMessages}`,
                short: true,
              },
              {
                title: 'Participant Information',
                value: `isMod: ${result.conversation?.participant?.isMod}, isAdmin: ${result.conversation?.participant?.isAdmin}, isApproved: ${result.conversation?.participant?.isApproved}, isHidden: ${result.conversation?.participant?.isHidden}, isDeleted: ${result.conversation?.participant?.isDeleted}, isAuto: ${result.conversation?.isAuto}`,
                short: false,
              },
              {
                title: 'Last Updated At',
                value : `${result.conversation?.lastUpdated}`,
                short: false,
              },
              {
                title: 'isInternalModmail (Mod-only)',
                value: `${result.conversation?.isInternal}`,
                short: true,
              },
            ],
          },
        ],
      };
    } else if (discordWebhookURLs.some(url => webhook.startsWith(`https://${url}/api/webhooks/`))) {
      // Check if the webhook is a Discord webhook
      payload = {
        embeds: [
          {
            title: `${result.conversation?.subject}`,
            url: modmailLink,
            author: {
              name: authorName,
              url: authorProfileLink,
            },
            description: `Body: **${body}**\n\nParticipating As: ${participatingAs}`,
          },
          {
            title: 'Modmail Conversation Details',
            fields: [
              {
                name: 'Conversation Type',
                value: `${result.conversation?.conversationType}`,
                inline: true,
              },
              {
                name: 'Conversation State',
                value: `${result.conversation?.state}`,
                inline: true,
              },
              {
                name: 'Participant',
                value: `${result.conversation?.participant?.name}`,
                inline: true,
              },
              {
                name: 'Number of Messages',
                value: `${result.conversation?.numMessages}`,
                inline: true,
              },
              {
                name: 'Participant Information',
                value: `isMod: ${result.conversation?.participant?.isMod}, isAdmin: ${result.conversation?.participant?.isAdmin}, isApproved: ${result.conversation?.participant?.isApproved}, isHidden: ${result.conversation?.participant?.isHidden}, isDeleted: ${result.conversation?.participant?.isDeleted}, isAuto: ${result.conversation?.isAuto}`,
                inline: true,
              },
              {
                name: 'Last Updated At',
                value: `${result.conversation?.lastUpdated}`,
                inline: true,
              },
              {
                name: 'isInternalModmail (Mod-only)',
                value: `${result.conversation?.isInternal}`,
                inline: true,
              },
            ],
          },
        ],
      };
    } else {
      throw new Error('This webhook is neither from Slack nor Discord.');
    }

    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Error sending data to webhook');
    }
  } catch (error: any) {
    // Let's handle the errors and log them
    console.error('Error:', error.message);
  }
}

export default Devvit;
