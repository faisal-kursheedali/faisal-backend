const requestIP = require("request-ip");

const getIp = (req) => {
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    return "49.37.195.80";
  } else {
    const ip = requestIP.getClientIp(req);

    return ip;
  }
};
module.exports = getIp;
