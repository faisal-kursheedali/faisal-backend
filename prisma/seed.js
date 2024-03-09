const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const options = await prisma.options.createMany({
    data: [
      {
        name: "collectUserData",
        boolValue: true,
      },
    ],
  });
  console.log({ options });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
