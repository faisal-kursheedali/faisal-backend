const getIp = (req) => {
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    return "49.37.192.155";
  } else {
    const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
      ","
    )[0];
    return ip;
  }
};
module.exports = getIp;
