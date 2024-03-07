const { prisma } = require("../db");

const getOptions = async ({ name }) => {
  const data = await prisma.options.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });
  console.log(data);
  return data ? data : false;
};

module.exports = {
  getOptions,
};
