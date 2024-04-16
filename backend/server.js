const express = require("express");
const chats = require("./Data/data");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleWare");
const path = require("path");

const PORT = process.env.PORT || 300;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/messages", messageRouter);

// app.use(notFound);
// app.use(errorHandler);

const server = app.listen(PORT, async () => {
  console.log("Connectin to server");
  await connectDB();
  console.log("Server is running on http://localhost:5000");
});

const io = require("socket.io")(server, {
  ping: 60000,
  cors: {
    origin: "https://letsconnect-chat.netlify.app/",
  },
});

io.on("connection", (socket) => {
  console.log(`A client connected : ${socket.id}`);

  socket.on("setup", function (userData) {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", function (room) {
    socket.join(room);
    console.log(`1st User id joined the room : ${room}`);
  });

  socket.on("new message", function (newMessageRecieved) {
    var chat = newMessageRecieved.chat;
    console.log(newMessageRecieved);

    if (!chat.users) return console.log("chat.users  not defined!");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
