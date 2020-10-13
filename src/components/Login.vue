<template>
  <h2>Login</h2>
  <form id="login-form" @submit.prevent="doLogin">
    <input v-model="username" type="text" placeholder="username" class="login-input" />
    <input v-model="password" type="password" placeholder="password" class="login-input" />
    <button type="submit">Login</button>
  </form>
  <h2>Register</h2>
  <form id="register-form" @submit.prevent="doRegister">
    <input v-model="regeiserUsername" type="text" placeholder="username" class="login-input" />
    <input v-model="registerPassword" type="password" placeholder="password" class="login-input" />
    <input v-model="confirm" type="password" placeholder="confirm" class="login-input" />
    <input v-model="email" type="text" placeholder="email" class="login-input" />
    <input v-model="fullname" type="text" placeholder="display name" class="login-input" />

    <button type="submit">Register</button>
  </form>
</template>

<script>
import { login, newuser } from "../api";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      regeiserUsername: "",
      registerPassword: "",
      fullname: "",
      confirm: "",
      email: "",
    };
  },
  methods: {
    proceed(macaroon) {
      localStorage.setItem("macaroon", macaroon);
      this.$store.commit('setauth', true)
      this.$router.push('/')
    },
    doLogin(e) {
      login(this.username, this.password).then((response) => {
        if (response.success) {
          this.proceed(response.macaroon)
        }
      });
    },
    doRegister(e) {
      // TODO: validate: check confirm, all required except email
      newuser(this.regeiserUsername, this.registerPassword, this.fullname, this.email).then(response => {
        if (response.success) {
          this.proceed(response.macaroon)
        }
      })
    }
  },
};
</script>