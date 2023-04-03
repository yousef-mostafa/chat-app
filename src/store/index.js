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
    socketConnection(state, token) {
      socketServes.setupSocketConnection(token);
    },
    sendMessage(state, payload) {
      socketServes.sendMessage({ message: payload.message, roomName: payload.CHAT_ROOM }, cb => {});
    },
    addLocalMsg(state, localMsg) {
      state.messages.push({
        name: state.user.name,
        id: new Date().valueOf(),
        message:localMsg,
        local:true
      });
    },
    receiveMessage(state) {
      socketServes.subscribeToMessages((err, data) => {
        state.messages.push(data)
      });
    },
    setUserInfo(state){
      socketServes.userInfo((err, data) => {
        state.user = data;
      })
    }
  },
  actions: {
    handleLocalMsg(context , payload){
      context.commit("sendMessage", payload);
      context.commit("addLocalMsg" , payload.message);
    }
  },
  modules: {
  }
})
