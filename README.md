# Reddit Modmail To Discord or Slack
A Devvit [(Reddit's Developer Platform)](https://developers.reddit.com/) app which sends incoming and outgoing modmails from your subreddit's modmail to a Discord or Slack webhook instantly.  Sends the message, sender, participant information etc. &amp; other relevant information to the webhook payload.

## Screenshots
![Discord](https://i.imgur.com/XibttPT.png)
![Slack](https://i.imgur.com/DgarVVg.png)

## Setup Instructions
### Discord
To set-up this app to send incoming and outgoing modmails to a particular channel of your Discord server through a Webhook follow these steps.

1. **Get Discord Webhook URL** : You'll need to generate a Discord Webhook URL from channel settings. Detailed instructions can be found below :
   
<details>
<summary> Instructions to Get Discord Webhook URL </summary>
   
1.  **Create a Discord Webhook:**  - Open or create a Discord server where you have the necessary permissions. - Go to the channel where you want the webhook to send messages. - Right-click on the channel name and select "Edit Channel."
2.  **Navigate to Integrations:**  - In the channel settings, find the "Webhooks" option under the Integrations tab in the left-hand menu. - Click on "Webhooks" to access the webhook settings. 
3.  **Create a New Webhook:**  - Click the "Create Webhook" button. - Customize the webhook by giving it a name, setting the profile picture (optional), and choosing the channel where it will send messages. - Once configured, click the "Save" or "Create" button. 
4.  **Copy the Webhook URL:**  - After creating the webhook, you'll see a section with the webhook URL. - Click on the "Copy" button next to the webhook URL to save it to your clipboard.  

</details>
