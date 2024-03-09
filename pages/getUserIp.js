const { prisma } = require("../db");

const getUserIp = async (id) => {
  try {
    const ip = await prisma.users.findFirst({
      where: {
        userId: Number(id),
      },
    });

    return ip.userIP;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getUserIp,
};
