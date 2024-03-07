const requestIP = require("request-ip");

const getIp = (req) => {
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    return "49.37.192.155";
  } else {
    const ip = requestIP.getClientIp(req);

    return ip;
  }
};
module.exports = getIp;
