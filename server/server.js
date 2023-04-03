const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: [
      "http://192.168.1.5:8080",
      "http://localhost:8080"
    ],
    credentials: true
  },
});

const jwt = require('jsonwebtoken');

// jwt secret
const JWT_SECRET = 'myHashSecret';

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    socket.user = user;
    socket.emit("userInfo" , socket.user);
    next();

  } catch (error) {
    console.log('error', error.message);
    return next(new Error(error.message));
  }
})


io.on('connection', (socket) => {
  // join user's to static room "ChatRoomId"
  socket.join('ChatRoomId');
  console.log('a user connected');

  socket.on("join", (roomName) => {
    console.log("join: " + roomName);
    socket.join(roomName);
  });

  socket.on("message", ({ message, roomName }, callback) => {
    // generate data to send to receivers
    const outgoingMessage = {
      name: socket.user.name,
      id: new Date().valueOf(),
      message,
      local:false
    };
    // send to all user in ${roomName} except sender => handel sender letter
    socket.to(roomName).emit("message", outgoingMessage);
    callback({
      status: "ok"
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});