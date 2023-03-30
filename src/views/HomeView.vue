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
      <div class="massages"></div>
      <form @submit.prevent="sendMassage()">
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
  methods: {
    submitToken() {
      this.$store.commit("socketConnection", this.token);
    },
    sendMassage() {
      const CHAT_ROOM = "ChatRoomId";
      const message = this.inputMessage;
      this.$store.commit("sendMassage", { message, CHAT_ROOM });
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