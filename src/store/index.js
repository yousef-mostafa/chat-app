import Vue from 'vue'
import Vuex from 'vuex'
import socketServes from "../socket.io-client/dist/socket.io";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:[],
    massages : []
  },
  getters: {
  },
  mutations: {
    socketConnection(state , token) {
      socketServes.setupSocketConnection(token);
    },
    sendMassage(state , payload) {
      // socketServes.socket.on("broadcast", (data) => {
      //   console.log(data);
      // });
      // console.log(payload);
      let message = payload.message;
      socketServes.sendMessage({message, roomName: payload.CHAT_ROOM}, cb => {
        console.log(cb);
      });
      socketServes.subscribeToMessages((err, data) => {
        console.log(data);
      });
    },
    newMassage() {
      socketServes.socket.emit('message' , this.state.massages);
    }
  },
  actions: {
  },
  modules: {
  }
})
