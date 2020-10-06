<template>
  <div class="menu">
    <router-link to="/">
      <div class="menu-item" :class="page===PAGE.FEED ? 'selected' : ''">Home</div>
    </router-link>
    <!-- <router-link to="/program"> -->
      <div class="menu-item" :class="page===PAGE.PROGRAM ? 'selected' : ''">Program</div>
    <!-- </router-link> -->
    <!-- <router-link to="/groups"> -->
      <div class="menu-item" :class="page===PAGE.GROUPS ? 'selected' : ''">Groups</div>
    <!-- </router-link> -->
    <router-link to="/notifications">
      <div class="menu-item" :class="page===PAGE.NOTIFICATIONS ? 'selected' : ''">Notifications</div>
    </router-link>
    <router-link to="/messages">
      <div class="menu-item" :class="page===PAGE.MESSAGES ? 'selected' : ''">Messages</div>
    </router-link>
    <router-link to="/people">
      <div class="menu-item" :class="page===PAGE.PEOPLE ? 'selected' : ''">People</div>
    </router-link>
  </div>
</template>

<script>
import { PAGE } from "../constants"
export default {
  name: "NaveMenu",
  computed: {
    page() {
      return this.$store.state.currentPage
    }
  },
  data() {
    return {
      PAGE: PAGE
    }
  },
  methods: {
    changePage(p) {
      this.$store.dispatch('setpage', p)
    }
  },
  watch:{
    $route (to, from){
      switch(to.path) {
        case '/':
          this.changePage(PAGE.FEED)
          break;
        case '/notifications':
          this.changePage(PAGE.NOTIFICATIONS)
          break;
        case '/messages':
          this.changePage(PAGE.MESSAGES)
          break;
        case '/people':
          this.changePage(PAGE.PEOPLE)
          break;
        case '/profile':
          this.changePage(PAGE.PROFILE)
          break;
        case 'post':
          this.changePage(PAGE.POST)
          break;
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: gray;
}

a:visited {
  color: gray;
}

.menu {
  margin-top: 80px;
  width: 200px;
}
.menu-item {
  padding: 10px;
}
.menu-item:hover {
  background-color: blanchedalmond;
}

a.router-link-active {
  color: blue;
  font-weight: 600;
}
</style>