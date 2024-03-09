// const Slack = require("@slack/bolt");
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

  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: error
          ? process.env.SLACK_ERROR_CHANNEL_DEV
          : isOnboard
          ? process.env.SLACK_USER_ONBOARD_CHANNEL_DEV
          : process.env.SLACK_USER_VIEW_CHANNEL_DEV,
        text: error
          ? "🐞 Bug in the site/ socket"
          : isOnboard
          ? "New user onboard 🚀"
          : "A user is viewing 👀", // Include the text content alongside blocks
        blocks: blocks,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          console.log("Message sent successfully!");
        } else {
          console.error("Error sending message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: error
          ? process.env.SLACK_ERROR_CHANNEL
          : isOnboard
          ? process.env.SLACK_USER_ONBOARD_CHANNEL
          : process.env.SLACK_USER_VIEW_CHANNEL,
        text: error
          ? "🐞 Bug in the site/ socket"
          : isOnboard
          ? "New user onboard 🚀"
          : "A user is viewing 👀", // Include the text content alongside blocks
        blocks: blocks,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          console.log("Message sent successfully!");
        } else {
          console.error("Error sending message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};

const sendSlackError = (error) => {
  console.log("before sending error to slack");
  sendSlackMessage({ error });
  return;
};

module.exports = {
  sendSlackError,
  sendSlackMessage,
};
