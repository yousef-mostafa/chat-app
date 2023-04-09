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

let users = [
  {
    "name": "yousef mostafa",
    "pass": "1182001",
    "email": "yousef@test.com",
    "id": 1
  },
  {
    "name": "Mostafa Sayed",
    "pass": "123456",
    "email": "Mostafa@test.com",
    "id": 2
  },
  {
    "name": "John Doe",
    "pass": "963852741",
    "email": "John@test.com",
    "id": 3
  },
]
app.get("/users", (req, res) => {
  res.json(users);
});
// find user from users array using request
app.get("/users/:email", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const email = req.params.email;
  const user = users.filter(user => user.email == email);
  if (user.length) {
    res.json(user);
    return;
  }
  else {
    res.status(404).send('user not found');
  }
});

io.use(async (socket, next) => {
  next();
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
      local: false
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