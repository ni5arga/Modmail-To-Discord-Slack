# Reddit Modmail To Discord or Slack
A Devvit [(Reddit's Developer Platform)](https://developers.reddit.com/) app which sends incoming and outgoing modmails from your subreddit's modmail to a Discord or Slack webhook instantly.  Sends the message, sender, participant information etc. &amp; other relevant information to the webhook payload.

## Screenshots
![Discord](https://i.imgur.com/XibttPT.png)
![Slack](https://i.imgur.com/DgarVVg.png)

## Setup Instructions
### Discord
To set-up this app to send incoming and outgoing modmails to a particular channel of your Discord server through a Webhook follow these steps.

1. **Get Discord Webhook URL** : You'll need to generate a Discord Webhook URL from channel settings. You can learn how to get webhook URLs from [this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) or detailed instructions on how to generate Discord Webhook URL can be found below. Discord Webhook URLs look like this `https://discord.com/api/webhooks/1234567880123/38823asdihasuad_d83289324Q`.
   
<details>
<summary> Instructions on how to Get Discord Webhook URL </summary>
   
1.  **Create a Discord Webhook:**  - Open or create a Discord server where you have the necessary permissions. - Go to the channel where you want the webhook to send messages. - Right-click on the channel name and select "Edit Channel."
2.  **Navigate to Integrations:**  - In the channel settings, find the "Webhooks" option under the Integrations tab in the left-hand menu. - Click on "Webhooks" to access the webhook settings. 
3.  **Create a New Webhook:**  - Click the "Create Webhook" button. - Customize the webhook by giving it a name, setting the profile picture (optional), and choosing the channel where it will send messages. - Once configured, click the "Save" or "Create" button. 
4.  **Copy the Webhook URL:**  - After creating the webhook, you'll see a section with the webhook URL. - Click on the "Copy" button next to the webhook URL to save it to your clipboard.  

</details>

2. **Put the URL in your app settings** : After you have obtained the webhook URL, you'll need to put it in the app settings. App settings can be found at `https://developers.reddit.com/r/insert-your-subreddit-name-here/apps/modmailtodiscord/`. After putting the Webhook URL in the text-box - click on the Save Changes button.

Now the app will send all incoming or outgoing modmails from your subreddit's modmail to the Discord Channel through the webhook.

### Slack

To set-up this app to send incoming and outgoing modmails to a particular channel of your Slack workspace through a Webhook follow these steps.

1. **Get Slack Webhook URL** : You'll need to obtain a Webhook URL to send the messages to a particular channel of your workspace - [here's a guide] on how to obtain the Slack Webhook URL. Slack Webhook URLs look like `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`.
   
2. **Put the URL in your app settings** :  After you have obtained the webhook URL, you'll need to put it in the app settings. App settings can be found at `https://developers.reddit.com/r/insert-your-subreddit-name-here/apps/modmailtodiscord/`. After putting the Webhook URL in the text-box - click on the Save Changes button.

Now the app will send all incoming or outgoing modmails from your subreddit's modmail to the Slack Channel through the webhook.

## Details 
The app sends all incoming and outgoing modmails from your subreddit's modmail to your Discord/Slack Channel through webhooks. Here are the details the app currently sends:

**First Embed** : 

 1. Modmail Subject - The subject of the modmail (incoming or outgoing).
 2. Modmail Link - The link of the modmail thread, the app sends `https://mod.reddit.com/all/{conversation-ID-here}` links.
 3. Body - Sends the message body in markdown.
 4. Participating As - What the user is participating as, whether as `participant_user` or as `moderator`.

**Second Embed** :

 5. Conversation Type -  Conversation Type specifies whether a conversation is with a subreddit itself, with another user, or with another subreddit entirely. `internal` means conversation with a Mod Discussion, internal to the subreddit.`sr_user` means conversation between the subreddit & an another user outside of the subreddit. `sr_sr` means conversation between two different subreddits.
 6. Conversation State - The State of the modmail conversation. Can be `New`, `Appeals`, `Archived`, `Filtered`, `InProgress` & `JoinRequests`.

    

