const { prisma } = require("../db");
const verifyUser = require("./verifyUser");
const { sendSlackMessage } = require("./slack");
const addError = require("./error");

const addUser = async (ip, date) => {
  const dateUTC = new Date(date);
  if (await verifyUser(ip)) {
    try {
      const user = await prisma.users.update({
        data: {
          userVisits: {
            push: dateUTC,
          },
        },
        where: {
          userIP: ip,
        },
      });
      await sendSlackMessage({
        isOnboard: false,
        country: user.countryName,
        region: user.region,
        city: user.city,
        userId: user.userId,
        userIP: user.userIP,
      });

      return "user_visit";
    } catch (e) {
      console.log(e);
      await addError(e, ip);
      return false;
    }
  }
  try {
    const data = await getUserLocation(ip, dateUTC);
    const user = await prisma.users.create({
      data: {
        ...data,
      },
    });
    await sendSlackMessage({
      isOnboard: true,
      country: user.countryName,
      region: user.region,
      city: user.city,
      userId: user.userId,
      userIP: user.userIP,
    });
    return "user_onboard";
  } catch (e) {
    console.log(e);
    await addError(e, ip);
    return false;
  }
};

const getUserLocation = async (ip, joinUTCDate) => {
  const data1 = await fetch(`https://ipapi.co/${ip}/json/`).then((res) =>
    res.json()
  );
  console.log(data1);
  if (data1.error) {
    const data2 = await fetch(`http://ip-api.com/json/${ip}`).then((res) =>
      res.json()
    );
    console.log(data2);
    return {
      city: data2.city,
      countryName: data2.country,
      latitude: `${data2.lat}`,
      longitude: `${data2.lon}`,
      org: data2.org,
      postal: data2.zip,
      region: data2.regionName,
      timezone: data2.timezone,
      userIP: data2.query,
      countryCode: data2.countryCode,
      regionCode: data2.region,
      joinUTCDate: joinUTCDate,
      userVisits: [joinUTCDate],
    };
  } else {
    return {
      city: data1.city,
      countryName: data1.country_name,
      latitude: `${data1.latitude}`,
      longitude: `${data1.longitude}`,
      org: data1.org,
      postal: data1.postal,
      region: data1.region,
      timezone: data1.timezone,
      userIP: data1.ip,
      countryCode: data1.country_code,
      regionCode: data1.region_code,
      joinUTCDate: joinUTCDate,
      userVisits: [joinUTCDate],
    };
  }
};

module.exports = addUser;
