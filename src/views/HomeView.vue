<template>
  <div class="home">
    <div class="d-flex justify-content-center">
      <form @submit.prevent="submitToken()">
        <p>Enter room token</p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="token" />
          <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
    <div class="chat">
      <div class="messages">
        <p v-for="message in messages" :key="message.id">
        <span>{{message.name}}</span>:<span>{{message.message}}</span>
        </p>
      </div>
      <form @submit.prevent="sendMessage()">
        <div class="input-group">
          <input type="text" class="form-control" v-model="inputMessage" />
          <button class="btn btn-dark" type="submit">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeView",
  data() {
    return {
      token: "",
      inputMessage: "",
    };
  },
  computed:{
    messages(){
      return this.$store.state.messages;
    }
  },
  methods: {
    submitToken() {
      this.$store.commit("socketConnection", this.token);
      this.$store.commit("setUserInfo");
      this.$store.commit("receiveMessage");
    },
    sendMessage() {
      const CHAT_ROOM = "ChatRoomId";
      const message = this.inputMessage;
      this.$store.dispatch("handleLocalMsg", { message, CHAT_ROOM });
      this.inputMessage = "";
    },
  },
};
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
  margin: auto;
  padding: 4px;
  border: 1px solid #6c6c6c;
  border-radius: 8px;
  height: 400px;
}
</style>