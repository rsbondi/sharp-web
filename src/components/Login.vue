<template>
  <div class="flex-container">
    <div class="promo">
      <h2>Welcome!</h2>
      <p>
        Come join in an exploration of discovering a fun new way toward health.
        Share ideas with others on how to best achieve a balance between what
        nature demands for your health and what society demands, that may work
        in opposition.
      </p>

      <img :src="`${ASSETS_URL}/health-society.png`"/>

      <p>
        Much of our customs we hold dear to us, but unknowingly they do not serve
        us as far as our health is concerned.  This is a place to find the balance
        between keeping our traditions alive and doing it in a healthy way.
      </p>

      <p>
        Please register to get started.  No email required, we respect privacy above all.
        The only use we have is for password recovery.  If you have a good memory or use a
        password manager, then no need to reveal.  Our goal is to promote health, not to become
        another big tech marketing firm.  We hope you will find value in this and can support
        us in other ways.
      </p>

      <p>
        <em>
          Note: currently under development, site made available for testing purposes.
          <a href="https://github.com/rsbondi/sharp-web/issues">Feedback</a> is greatly appreciated.
        </em>
      </p>

    </div>
    <div>
      <form id="login-form" @submit.prevent="doLogin">
        <h2>Login</h2>
        <div class="form-field">
          <input v-model="username" type="text" placeholder="username" class="login-input" />
        </div>
        <div class="form-field">
          <input v-model="password" type="password" placeholder="password" class="login-input" />
        </div>
        <div class="form-field">
          <button type="submit">Login</button>
        </div>
      </form>
      <form id="register-form" @submit.prevent="doRegister">
        <h2>Register</h2>
        <div class="form-field">
          <input v-model="regeiserUsername" type="text" placeholder="username" class="login-input" />
        </div>
        <div class="form-field">
          <input v-model="registerPassword" type="password" placeholder="password" class="login-input" />
        </div>
        <div class="form-field">
          <input v-model="confirm" type="password" placeholder="confirm" class="login-input" />
        </div>
        <div class="form-field">
          <input v-model="email" type="text" placeholder="email" class="login-input" />
        </div>
        <div class="form-field">
          <input v-model="fullname" type="text" placeholder="display name" class="login-input" />
        </div>

        <div class="form-field">
          <button type="submit">Register</button>
        </div>
        <div class="err">
          {{err}}
        </div>
      </form>
    </div>
  </div>  
</template>

<script>
import { login, newuser } from "../api";
import { ASSETS_URL } from '../constants'
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
      err: "",
      ASSETS_URL
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
      this.err = ""
      if (this.regeiserUsername === "") this.err = "username required"
      else if (this.registerPassword === "") this.err = "password required"
      else if (this.confirm === "") this.err = "confirm password required"
      else if (this.confirm !== this.registerPassword) this.err = "confirm and password must match"
      else if (this.fullname === "") this.err = "display name required"
      if (!this.err)
      newuser(this.regeiserUsername, this.registerPassword, this.fullname, this.email).then(response => {
        if (response.success) {
          this.proceed(response.macaroon)
        } else {
          if (response.code === 19) this.err = "duplate username"
          else this.err = "unknown error"
        }
      }).catch(e => console.log)
    }
  },
};
</script>

<style scoped>
form {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 2em;
  margin-top: 2em;
  padding-bottom: 4em;
}

button {
  float: right;
  margin-top: 2em;;
}

p {
  line-height: 1.5em;
}
.form-field {
  margin-bottom: 1em;;
}

.promo {
  width: 600px;
  margin: 1em;
}

.err {
  color: red;
  font-size: 0.8em;
  font-style: italic;
}
</style>