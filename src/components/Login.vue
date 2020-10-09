<template>
  <form id="login-form" @submit.prevent="doLogin">
    <input v-model="username" type="text" placeholder="username" class="login-input" />
    <input v-model="password" type="password" placeholder="password" class="login-input" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { login } from "../api";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    doLogin(e) {
      console.log("login submit");
      login(this.username, this.password).then((response) => {
        console.log("login response", response);
        if (response.success) {
          localStorage.setItem("macaroon", response.macaroon);
          this.$store.commit('setauth', true)
          this.$router.push('/')
        }
      });
    },
  },
};
</script>