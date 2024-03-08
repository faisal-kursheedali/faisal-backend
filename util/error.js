const objectHash = require("object-hash");
const { prisma } = require("../db");
const { sendSlackError } = require("./slack");

const dateTime = new Date();
const addError = async (e) => {
  const { message, name, stack } = e;
  await prisma.error.create({
    data: {
      message,
      name,
      stack,
      dateTime: [dateTime],
      count: 1,
    },
  });
  sendSlackError(e);
};

module.exports = addError;
