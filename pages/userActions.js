const { prisma } = require("../db");

const userActions = async (ip, hour = 24) => {
  if (hour === null || hour === 0) {
    try {
      const navbar = await prisma.navbar.findMany({
        where: {
          userIP: ip,
        },
      });
      const footer = await prisma.footer.findMany({
        where: {
          userIP: ip,
        },
      });
      const home = await prisma.home.findMany({
        where: {
          userIP: ip,
        },
      });
      const about = await prisma.about.findMany({
        where: {
          userIP: ip,
        },
      });
      const project = await prisma.project.findMany({
        where: {
          userIP: ip,
        },
      });
      const blog = await prisma.blog.findMany({
        where: {
          userIP: ip,
        },
      });
      const navigation = await prisma.userNavigation.findMany({
        where: {
          userIP: ip,
        },
      });
      return {
        navigation,
        home,
        project,
        blog,
        about,
        navbar,
        footer,
      };
    } catch (e) {
      return e;
    }
  } else {
    let lastDay = Date.now() - hour * 60 * 60 * 1000;
    lastDay = new Date(lastDay).toISOString();
    try {
      const navbar = await prisma.navbar.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });
      const footer = await prisma.footer.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });
      const home = await prisma.home.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });
      const about = await prisma.about.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });
      const project = await prisma.project.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });
      const blog = await prisma.blog.findMany({
        where: {
          AND: {
            userIP: ip,
            dateTime: {
              gte: lastDay,
            },
          },
        },
      });

      return {
        home,
        project,
        blog,
        about,
        navbar,
        footer,
      };
    } catch (e) {
      return e;
    }
  }
};

module.exports = userActions;
