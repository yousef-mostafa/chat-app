<template>
  <div class="home">
    <div class="info">
      <h2 class="mb-3">{{ welcomeText }}</h2>
      <p class="error text-danger">{{ error }}</p>
    </div>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="submitToken()" v-if="!login">
        <!-- <p>Enter Your authorized token</p> -->
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="token" />
          <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
    <div class="chat">
      <div class="messages">
        <p v-for="message in messages" :key="message.id">
          <span>{{ message.name }}</span
          >:<span>{{ message.message }}</span>
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
      login: false,
      welcomeText: "Enter your authorized token",
      error: "",
      inputMessage: "",
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    submitToken() {
      this.$store.commit("socketConnection", this.token);
      this.$store.commit("setUserInfo");
      this.$store.commit("receiveMessage");
      setTimeout(() => {
        if (this.user) {
          this.login = true;
          this.welcomeText = `Welcome ${this.user.name}`;
          this.error = "";
        } else {
          this.error = "invalid token";
          this.token = "";
        }
      }, 300);
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