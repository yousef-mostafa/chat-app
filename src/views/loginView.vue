<template>
  <div class="d-flex justify-content-center">
    <form @submit.prevent="login()">
      <h2 class="mb-4">Login</h2>
      <div class="d-flex gap-2 align-items-center mb-3">
        <label for="email">Email:</label>
        <input
          type="text"
          name="email"
          class="form-control"
          required
          v-model="userEmail"
        />
      </div>
      <div class="d-flex gap-3 align-items-center mb-3">
        <label for="pass">Pass:</label>
        <input
          type="password"
          name="pass"
          class="form-control"
          required
          v-model="pass"
        />
      </div>
      <button class="btn btn-success w-100" type="submit">Submit</button>
      <p class="error text-danger my-4">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "",
      pass: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.userEmail,
        pass: this.pass,
      }) == "succeed"
        ? this.$router.push("/")
        : (this.error = "invalid password or email, please try again");
    },
  },
};
</script>