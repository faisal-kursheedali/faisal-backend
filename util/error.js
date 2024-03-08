const { prisma } = require("../db");
const { sendSlackError } = require("./slack");

const addError = async ({ error, dateTime }) => {
  const { message, name, stack } = error;
  const error = await verifyError(message);
  if (error) {
    await prisma.error.update({
      data: {
        count: error.count + 1,
        dateTime: {
          push: dateTime,
        },
      },
      where: {
        id: error.id,
      },
    });
    sendSlackError(error, false);
  } else {
    await prisma.error.create({
      data: {
        message,
        name,
        stack,
        dateTime: [dateTime],
        count: 1,
      },
    });
    sendSlackError(error, true);
  }
};

const verifyError = async (message) => {
  const error = await prisma.error.findFirst({
    where: {
      message: message,
    },
  });
  error ? error : false;
};

module.exports = addError;
