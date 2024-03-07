const { prisma } = require("../db");

const verifyUser = async (ip) => {
  const user = await prisma.users.findFirst({
    where: {
      userIP: ip,
    },
  });
  console.log(user);
  console.log(user);
  if (user) {
    return user.userId;
  } else {
    return false;
  }
};

module.exports = verifyUser;
