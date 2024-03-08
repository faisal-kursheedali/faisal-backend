// const { prisma } = require("../db/db");
const { prisma } = require("../db");
const addUser = require("./addUser");
const addError = require("./error");

const addData = async (data, joinDate, ip /* { navigation = false } */) => {
  try {
    await insertToDB(data, ip);
    return true;
  } catch (e) {
    console.log(e);
    if (e?.meta?.field_name?.includes("userIP_fkey")) {
      try {
        console.log("Insert user then insert data");
        if (await addUser(ip, joinDate)) {
          await insertToDB(data, ip);
          return true;
        } else {
          await addError(e, ip);
          return false;
        }
      } catch (e) {
        console.log(e);
        await addError(e, ip);
        return false;
      }
    }
  }
};

const insertToDB = async (data, ip) => {
  if (data.navbar.length > 0) {
    const value = data.navbar.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.navbar.createMany({
      data: value,
    });
  }
  if (data.footer.length > 0) {
    const value = data.footer.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.footer.createMany({
      data: value,
    });
  }
  if (data.home.length > 0) {
    const value = data.home.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.home.createMany({
      data: value,
    });
  }
  if (data.about.length > 0) {
    const value = data.about.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.about.createMany({
      data: value,
    });
  }
  if (data.project.length > 0) {
    const value = data.project.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.project.createMany({
      data: value,
    });
  }
  if (data.blog.length > 0) {
    const value = data.blog.map((e) => {
      e.userIP = ip;
      e.dateTime = new Date(e.dateTime);
      return e;
    });
    await prisma.blog.createMany({
      data: value,
    });
  }
  if (data.navigation.length > 0) {
    const value = data.navigation.map((e) => {
      e.time = new Date(e.time);
      return e;
    });
    await prisma.userNavigation.create({
      data: {
        navigation: value,
        userIP: ip,
        userEntry: new Date(data.userEntry),
      },
    });
  }
};

module.exports = addData;
