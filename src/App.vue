<template>
  <Main v-if="auth"/>
  <Login v-if="!auth"/>
</template>

<script>
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import "./css/style.css"

export default {
  name: 'App',
  components: {
    Main,
    Login
  },
  computed: {
    auth() {
      return this.$store.state.auth
    }
  },
  watch: {
    auth() {}
  },
  mounted() {
    const auth = localStorage.getItem('macaroon')
    if (auth) this.$store.commit('setauth', true)
    else this.$router.push('/login')
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
