import express from "express";
import addData from "./util/addData.js";
// import getIp from "./util/ip";
import addUser from "./util/addUser.js";
import getIp from "./util/ip.js";
import bodyParser from "body-parser";
import cors from "cors";
import { getOptions } from "./util/options.js";

const app = express();
const port = 3000;

app.use(cors());
// For parsing application/json
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // For parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

app.post("/api/actions", async (req, response) => {
  try {
    const res = req.body;
    const ip = getIp(req);
    const data = await addData(res.data, res.date, ip);
    return data
      ? response.status(200).json({ message: "User actions are stored" })
      : response.status(400).json({ message: "Some thing went wrong" });
  } catch (e) {
    console.log(e);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.post("/api/users", async (req, response) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    const ip = getIp();
    const newUser = await addUser(ip, reqBody.date);
    if (newUser === "user_onboard") {
      return response.status(200).json({ message: "New user created" });
      // return res.json(200, { message: "New user created" });
    } else if (newUser === "user_visit") {
      return response.status(200).json({ message: "Existing user" });
      // return res.json(200, { message: "Existing user" });
    }
    return response.status(400).json({ message: "Some thing went wrong" });
    // return res.json({ message: "Some thing went wrong" }, { status: 400 });
  } catch (e) {
    console.log(e);
    return response.status(400).json({ message: "Some thing went wrong" });
    // return res.json({ message: "Some thing went wrong" }, { status: 400 });
  }
});

app.get("/api/options/:name", async (req, response) => {
  try {
    const name = req.params.name;
    const data = await getOptions({ name: name });
    return response.status(200).json({ data: data });
  } catch (e) {
    console.log(e);
    return response.status(400).json({ message: "Some thing went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
