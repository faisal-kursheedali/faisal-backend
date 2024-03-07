const Slack = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();
const sendSlackMessage = async ({
  isOnboard,
  country,
  region,
  city,
  userId,
  userIP,
  error = null,
}) => {
  const blocks = !error
    ? [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: isOnboard
              ? "⭐️ You have a new user onboarded in website:"
              : "🔥 You have a user viewing in website:",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "*User ID:*\n" + userId,
            },
            {
              type: "mrkdwn",
              text: "*Country:*\n" + country,
            },
            {
              type: "mrkdwn",
              text: "*Region:*\n" + region,
            },
            {
              type: "mrkdwn",
              text: "*City:*\n" + city,
            },
            {
              type: "mrkdwn",
              text: "*User IP:*\n" + userIP,
            },
          ],
        },
      ]
    : [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🐞 Bug in the site/ socket",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "*name:*\n" + error.name,
            },
            {
              type: "mrkdwn",
              text: "*message:*\n" + error.message,
            },
            {
              type: "mrkdwn",
              text: "*stack:*\n" + error.stack,
            },
          ],
        },
      ];

  const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
  });

  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: error
        ? process.env.SLACK_ERROR_CHANNEL_DEV
        : isOnboard
        ? process.env.SLACK_USER_ONBOARD_CHANNEL_DEV
        : process.env.SLACK_USER_VIEW_CHANNEL_DEV,
      text: error
        ? "🐞 Bug in the site/ socket"
        : isOnboard
        ? "New user onboard 🚀"
        : "A user is viewing 👀",
      blocks: blocks,
    });
  } else {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: error
        ? process.env.SLACK_ERROR_CHANNEL
        : isOnboard
        ? process.env.SLACK_USER_ONBOARD_CHANNEL
        : process.env.SLACK_USER_VIEW_CHANNEL,
      text: error
        ? "🐞 Bug in the site/ socket"
        : isOnboard
        ? "New user onboard 🚀"
        : "A user is viewing 👀",
      blocks: blocks,
    });
  }
};

module.exports = sendSlackMessage;
