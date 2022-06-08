require("dotenv").config();
const connectDB = require("./modules/db");

const app = require("./modules/app");
const server = require("http").createServer(app);

const io = require("socket.io")(server);

let users = [];

const addUser = (userId, socketId) => {
  if (userId && !users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) =>
  (users = users.filter((user) => user.socketId !== socketId));

const getUser = (userId) => users.find((user) => user.userId === userId);

io.on("connection", (socket) => {
  // console.log("socket:", socket);
  console.log("a user has connected.");

  socket.on("addUser", (userId) => {
    // console.log("addUser");
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, conversationId, text }) => {
    const user = getUser(receiverId);
    console.log("💌 sendMessage:", text);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        conversationId,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port: ${PORT}`));

// const server = require("http").createServer(app);

// const io = require("socket.io")(server);
