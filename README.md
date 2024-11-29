# Reddit Modmail To Discord or Slack

A Devvit [(Reddit's Developer Platform)](https://developers.reddit.com/) app that instantly sends incoming and outgoing modmails from your subreddit's modmail to a Discord or Slack webhook. Sends the message, sender, participant information, &amp; other relevant information to the webhook payload.

App Link: https://developers.reddit.com/apps/modmailtodiscord

App Identifier: modmailtodiscord

## Screenshots

| Discord                                     |
| ------------------------------------------- |
| ![Discord](https://i.imgur.com/yq5VX5o.png) |

| Slack                                     |
| ----------------------------------------- |
| ![Slack](https://i.imgur.com/ZwJa805.png) |

## Setup Instructions

### Discord

1. **Get Discord Webhook URL** : You'll need to generate a Discord Webhook URL from channel settings. You can learn how to get webhook URLs from [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) or detailed instructions on how to generate Discord Webhook URL can be found below. Discord Webhook URLs look like this: `https://discord.com/api/webhooks/1234567880123/38823ax30320bx_d83289324Q`.

<details>
<summary> Instructions on How to Get Discord Webhook URL </summary>

1. **Create a Discord Webhook:** - Open or create a Discord server where you have the necessary permissions. - Go to the channel where you want the webhook to send messages. - Right-click on the channel name and select "Edit Channel."
2. **Navigate to Integrations:** - In the channel settings, find the "Webhooks" option under the Integrations tab in the left-hand menu. - Click on "Webhooks" to access the webhook settings.
3. **Create a New Webhook:** - Click the "Create Webhook" button. - Customize the webhook by giving it a name, setting the profile picture (optional), and choosing the channel where it will send messages. - Once configured, click the "Save" or "Create" button.
4. **Copy the Webhook URL:** - After creating the webhook, you'll see a section with the webhook URL. - Click on the "Copy" button next to the webhook URL to save it to your clipboard.

</details>

2. **Put The URL In Your App Settings** : After you've obtained the webhook URL, you'll need to put it in the app settings. App settings can be found at `https://developers.reddit.com/r/insert-your-subreddit-name-here/apps/modmailtodiscord/`. After putting the Webhook URL in the text-box - click on the Save Changes button.

### Slack

1. **Get Slack Webhook URL** : You'll need to obtain a Webhook URL to send the messages to a particular channel of your workspace - [here's a guide](https://api.slack.com/messaging/webhooks) on how to obtain the Slack Webhook URL. Slack Webhook URLs look like `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`.

2. **Put The URL In Your App Settings** : After you have obtained the webhook URL, you'll need to put it in the app settings. App settings can be found at `https://developers.reddit.com/r/insert-your-subreddit-name-here/apps/modmailtodiscord/`. After putting the Webhook URL in the text-box - click on the Save Changes button.

## Details

The app sends all incoming and outgoing modmails from your subreddit's modmail to your Discord/Slack channel through webhooks. Here are the details the app currently sends (more to be added soon):

1. **Modmail Subject** - The subject of the modmail (incoming or outgoing)
2. **Modmail Link** - The link of the modmail thread, the app sends `https://mod.reddit.com/all/{conversation-ID-here}` links
3. **Author** - Author of the modmail message or the latest message in the modmail thread
4. **Body** - Sends the message body in Markdown
5. **Participant** - The participant of the modmail conversation (most of the times it'll be the user, unless it's a mod discussion or a subreddit to subreddit conversation)
6. **Participating As** - What the user is participating as, whether as `participant_user` or as `moderator`

## Changelog

### v0.0.16

- Add setting for app to ignore outgoing modmail messages by mods and not send them to the webhook (optional)

### v0.0.15

- Declutter Discord & Slack embed
- Add support for more Discord webhook URLs (Canary, PTB, etc.)

## Contributions

Feel free to contribute and improve this project. Pull requests and issues are always welcome.

## License

This source code is licensed under [GNU General Public License v3.0](https://github.com/ni5arga/Modmail-To-Discord-Slack/blob/main/LICENSE).
