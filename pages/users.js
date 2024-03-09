const { prisma } = require("../db");

const users = async () => {
  try {
    const data = await prisma.users.findMany();
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = users;
