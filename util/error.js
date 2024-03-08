const objectHash = require("object-hash");
const { prisma } = require("../db");
const { sendSlackError } = require("./slack");

const dateTime = new Date();

const addError = async (error, ip = null) => {
  if (ip != null) {
    try {
      await insertError(error, ip);
      return true;
    } catch (e) {
      console.log(e);
      if (e?.meta?.field_name?.includes("userIP_fkey")) {
        try {
          console.log("Insert user then insert data");
          if (await addUser(ip, joinDate)) {
            await insertError(error, ip);
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    }
  } else {
    try {
      await insertError(error, ip);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

const insertError = async (e, ip) => {
  const { message, name, stack } = e;
  await prisma.error.create({
    data: {
      message,
      name,
      stack,
      dateTime: dateTime,
      userIP: ip,
    },
  });
  sendSlackError(e);
};

module.exports = addError;
