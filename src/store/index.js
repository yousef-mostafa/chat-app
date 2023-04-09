import Vue from 'vue'
import Vuex from 'vuex'
import socketServes from "../socket.io-client/dist/socket.io";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",
    messages: [],
  },
  getters: {
  },
  mutations: {
    socketConnection() {
      socketServes.setupSocketConnection();
    },
    sendMessage(state, payload) {
      socketServes.sendMessage({ message: payload.message, roomName: payload.CHAT_ROOM }, cb => { });
    },
    addLocalMsg(state, localMsg) {
      state.messages.push({
        name: state.user.name,
        id: new Date().valueOf(),
        message: localMsg,
        local: true
      });
    },
    receiveMessage(state) {
      socketServes.subscribeToMessages((err, data) => {
        state.messages.push(data)
      });
    },
  },
  actions: {
    login(context, payload) {
      let result ;
      try {
        fetch(`http://localhost:3000/users/${payload.email}`)
        .then(data => data.status == 404 ? result = data.statusText: result = data.json)
        if (result.pass == payload.pass) {
          context.state.user = result;
          context.commit("socketConnection");
          context.commit("receiveMessage");
          return "succeed";
        }
        else {
          return "failed";
        }
      } catch (error) {
        return "failed";
      }
    },
    handleLocalMsg(context, payload) {
      context.commit("sendMessage", payload);
      context.commit("addLocalMsg", payload.message);
    }
  },
  modules: {
  }
})
