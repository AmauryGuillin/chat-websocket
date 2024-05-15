const app = require("express")();
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origins: ["*"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on("connection", (socket) => {
  //console.log("user connected");
  socket.on("disconnect", () => {
    //console.log("user disconnected");
  });

  socket.on("sendMessage", (msg) => {
    io.emit("messageToFront", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
