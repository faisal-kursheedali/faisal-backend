const { prisma } = require("../db");

const user = async (ip) => {
  try {
    const data = await prisma.users.findFirst({
      where: {
        userIP: ip,
      },
    });
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = user;
