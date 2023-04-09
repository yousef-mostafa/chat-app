import { io } from 'socket.io-client';

class socketServes {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
  }
  subscribeToMessages(cb) {
    if (!this.socket) return(true);
    this.socket.on('message', msg => {
      return cb(null, msg);
    });
  }
  sendMessage({message, roomName}, cb) {
    if (this.socket) this.socket.emit('message', { message, roomName }, cb);
  }
}

export default new socketServes();