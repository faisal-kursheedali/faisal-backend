const { prisma } = require("../db");

const addError = async ({ message, name, stack, dateTime }) => {
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

// use this later to store error to DB
