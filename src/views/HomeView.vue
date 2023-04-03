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
        <p
          v-for="message in messages"
          :key="message.id"
          class="messages__message"
          :class="[message.local ? 'local' : 'outside']"
        >
          <span>
            <!-- >{{ message.name | handelUserName(user.name) }} : -->
            {{ message.message }}</span
          >
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
  filters: {
    handelUserName(value, userName) {
      return userName == value ? "(me)" : `(${value})`;
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
      this.$nextTick(this.scrollToEnd());
    },
    scrollToEnd() {
      var container = this.$el.querySelector(".messages");
      container.scrollTop = container.scrollHeight + 120;
    },
  },
};
</script>

<style lang="scss">
$senderColor: #a5a3a3;
$receiverColor: #3b459c;
.chat {
  font-family: monospace;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
  margin: auto;
  padding: 4px;
  border: 1px solid #6c6c6c;
  border-radius: 8px;
  height: 400px;
  text-align: start;
  .messages {
    overflow-y: auto;
    padding: 8px 16px;
    margin: 8px 0px;
    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      border-radius: 4px;
    }
    &__message {
      span {
        padding: 8px 16px;
        border-radius: 12px;
      }
      &.local {
        text-align: end;
        span {
          border: 1px solid $receiverColor;
          color: white;
          background: $receiverColor;
          border-end-end-radius: inherit;
        }
      }
      &.outside {
        span {
          border: 1px solid $senderColor;
          color: black;
          background: $senderColor;
          border-end-start-radius: inherit;
        }
      }
    }
  }
}
</style>