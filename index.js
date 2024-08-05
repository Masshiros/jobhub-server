const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
dotenv.config();
const port = process.env.PORT;
// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port || 3000, () =>
  console.log(`Example app listening on port ${port}!`)
);
