const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const bookMarkRoute = require("./routes/bookmark.route");
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
app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);
const server = app.listen(port || 3000, () =>
  console.log(`Example app listening on port ${port}!`)
);
const io = require("socket.io")(server, {
  pingTimeOut: 600,
  cors: {
    origin: "https://jobhub-server-production.up.railway.app",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket");
  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.broadcast.emit("online-user", userId);
  });
  socket.on("typing", (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    console.log("stop typing");
    console.log("room");
    socket.to(room).emit("stop typing", room);
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined: " + room);
  });
  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    var room = chat._id;
    var sender = newMessageReceived.sender;
    if (!sender || sender._id) {
      console.log("Sender not defined");
      return;
    }
    var senderId = sender._id;
    console.log(senderId + "message sender");
    const users = chat.users;
    if (!users) {
      console.log("User not defined");
      return;
    }
    socket.to(room).emit("message received", newMessageReceived);
    socket.to(room).emit("message sent", "New Message");
  });
  socket.off("setup", () => {
    console.log("user offline");
    socket.leave(userId);
  });
});
