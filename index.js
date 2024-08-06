const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth.route");
const app = express();
dotenv.config();
const port = process.env.PORT;
// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
app.use(express.json());
app.use("/api/", authRoute);
app.listen(port || 3000, () =>
  console.log(`Example app listening on port ${port}!`)
);
