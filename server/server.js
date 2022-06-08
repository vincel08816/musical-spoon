require("dotenv").config();
const connectDB = require("./modules/db");

const app = require("./modules/app");
const server = require("http").createServer(app);

const io = require("socket.io")(server);

// let users = [];
const users = new Map();

io.on("connection", (socket) => {
  // console.log("socket:", socket);
  console.log("a user has connected.");

  socket.on("addUser", (userId) => {
    // console.log("addUser");
    users.set(userId, socket.id);
    users.set(socket.id, userId);

    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, conversationId, text }) => {
    const user = users.get(receiverId);
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
    const temp = users.get(socket);
    users.delete(temp);
    users.delete(socket);

    io.emit("getUsers", users);
  });
});

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
