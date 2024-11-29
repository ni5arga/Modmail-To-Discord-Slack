import { Devvit, TriggerContext } from '@devvit/public-api';
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
  {
    type: 'boolean',
    name: 'outgoing',
    label: 'Whether to send outgoing messages by mods to the webhook payload (Enabled by default, if disabled outgoing messages by mods will not be sent to the webhook payload.)',
    defaultValue: true,
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
      console.error('There was an error:', error.message);
    }
  },
});


async function sendModMailToWebhook(event: ModMail, context: TriggerContext) {
  try {
    // Retrieve settings
    const webhook = (await context?.settings.get('webhook')) as string;
    const outgoing = (await context?.settings.get('outgoing')) as boolean;

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

    // Get latest message
    const messages = result.conversation?.messages ?? {};
    const messageIds = Object.keys(messages);
    const lastMessageId = messageIds.length > 0 ? messageIds[messageIds.length - 1] : undefined;
    const lastMessage: MessageData | undefined = lastMessageId ? messages[lastMessageId] : undefined;

    if (!lastMessage) {
      console.error('No messages found');
      return;
    }

    const authorName = lastMessage.author?.name ?? 'Unknown';
    const body = lastMessage.bodyMarkdown ?? '';
    const participatingAs = lastMessage.participatingAs ?? 'Unknown';
    const authorProfileLink = `https://www.reddit.com/u/${authorName}`;

    if (participatingAs === 'moderator' && !outgoing) {
      console.log('Not sending outgoing messages to the webhook');
      return;
    }

    // Prepare and send payload
    let payload;

    // Check if webhook is Slack webhook
    if (webhook.startsWith('https://hooks.slack.com/')) {
      payload = {
        text: `*Modmail Subject:* <${modmailLink}|${result.conversation?.subject}>\n*Author:* <${authorProfileLink}|${authorName}>\n*Body:* ${body}\n\n*Participant:* ${result.conversation?.participant?.name}\n*Participating As:* ${participatingAs}`,
      };
    } else if (discordWebhookURLs.some(url => webhook.startsWith(`https://${url}/api/webhooks/`))) {
      // Check if webhook is Discord webhook
      payload = {
        embeds: [
          {
            title: `${result.conversation?.subject}`,
            url: modmailLink,
            author: {
              name: authorName,
              url: authorProfileLink,
            },
            description: `Author: [**${authorName}**](${authorProfileLink})\nBody: **${body}**\n\nParticipant: **${result.conversation?.participant?.name}**\nParticipating As: **${participatingAs}**`,
            color: 3447003, 
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
    // Handle errors and log them
    console.error('Error:', error.message);
  }
}

export default Devvit;
