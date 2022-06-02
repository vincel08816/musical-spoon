require("dotenv").config();
const connectDB = require("./modules/db");

const app = require("./modules/app");
const server = require("http").createServer(app);

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port: ${PORT}`));

// const server = require("http").createServer(app);

// const io = require("socket.io")(server);
