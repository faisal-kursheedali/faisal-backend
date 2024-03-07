const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

prisma.$on("query", (e) => {
  console.log("Query" + e.query);
  console.log("Params" + e.params);
  console.log("Duration" + e.duration);
});

module.exports = { prisma };
