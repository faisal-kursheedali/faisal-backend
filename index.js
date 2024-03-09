const express = require("express");
const addData = require("./util/addData.js");
const addUser = require("./util/addUser.js");
const getIp = require("./util/ip.js");
const cors = require("cors");
const { getOptions } = require("./util/options.js");
const bodyParser = require("body-parser");
const addError = require("./util/error.js");
const users = require("./pages/users.js");
const user = require("./pages/user.js");
const userActions = require("./pages/userActions.js");
const { getUserIp } = require("./pages/getUserIp.js");

const app = express();
const port =
  process.env.ENVIRONMENT === "DEVELOPMENT" ? 3000 : process.env.PORT;

app.use(cors());

app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

/// Deploymnet test
app.get("/", (req, res) => {
  res.send("Working-home");
});
app.get("/test", (req, res) => res.send("Working-test"));

/// UI view for admin
app.get("/api/view/users", async (req, res) => {
  const data = await users();
  res.send(data);
});
app.get("/api/view/user/:id", async (req, res) => {
  const id = req.params.id;
  const ip = await getUserIp(id);
  const data = await user(ip);
  res.send(data);
});
app.get("/api/view/userActions/:id", async (req, res) => {
  let hour = req.query.hour;
  const id = req.params.id;
  const ip = await getUserIp(id);
  const data = await userActions(ip, Number(hour));
  res.send(data);
});

app.post("/api/actions", async (req, response) => {
  const userIP = getIp(req);
  try {
    const res = JSON.parse(req.body);
    const ip = getIp(req);
    const data = await addData(res.data, res.date, ip);
    return data
      ? response.status(200).json({ message: "User actions are stored" })
      : response.status(400).json({ message: "Some thing went wrong" });
  } catch (e) {
    console.log(e);
    await addError(e, userIP);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.post("/api/users", async (req, response) => {
  const userIP = getIp(req);
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const ip = getIp(req);
    const newUser = await addUser(ip, reqBody.date);
    if (newUser === "user_onboard") {
      return response.status(200).json({ message: "New user created" });
    } else if (newUser === "user_visit") {
      return response.status(200).json({ message: "Existing user" });
    }
    return response.status(400).json({ message: "Some thing went wrong" });
  } catch (e) {
    console.log(e);
    await addError(e, userIP);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.get("/api/options/:name", async (req, response) => {
  const userIP = getIp(req);
  try {
    const name = req.params.name;
    const data = await getOptions({ name: name });
    return response.status(200).json({ data: data });
  } catch (e) {
    console.log(e);
    await addError(e, userIP);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
