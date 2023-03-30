const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080'],
    credentials: true
  },
});

const jwt = require('jsonwebtoken');

// jwt secret
const JWT_SECRET = 'myHashSecret';

io.use(async (socket , next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await jwt.verify(token , JWT_SECRET);

    console.log(`user: ${user}`);
    socket.user = user;
    next();

  } catch (error) {
    console.log('error', error.message);
    return next(new Error(error.message));
  }
})


io.on('connection', (socket) => {
  // join user's own room
  socket.join(socket.user.id);
  socket.join('ChatRoomId');
  console.log('a user connected');

  socket.on('my message', (msg) => {
    io.emit('broadcast', `server: ${msg}`);
  });

  socket.on("join", (roomName) => {
    console.log("join: " + roomName);
    socket.join(roomName);
  });

  socket.on("message", ({ message, roomName }, callback) => {
    console.log("message: " + message + " in " + roomName);
    socket.to(roomName).emit("message", message);
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