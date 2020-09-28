<template>
  <div class="menu">
    <div @click="changePage(PAGE.FEED)" class="menu-item" :class="page===PAGE.FEED ? 'selected' : ''">Home</div>
    <div @click="changePage(PAGE.PROGRAM)" class="menu-item" :class="page===PAGE.PROGRAM ? 'selected' : ''">Program</div>
    <div @click="changePage(PAGE.GROUPS)" class="menu-item" :class="page===PAGE.GROUPS ? 'selected' : ''">Groups</div>
    <div @click="changePage(PAGE.NOTIFICATIONS)" class="menu-item" :class="page===PAGE.NOTIFICATIONS ? 'selected' : ''">Notifications</div>
    <div @click="changePage(PAGE.MESSAGES)" class="menu-item" :class="page===PAGE.MESSAGES ? 'selected' : ''">Messages</div>
    <div @click="changePage(PAGE.PEOPLE)" class="menu-item" :class="page===PAGE.PEOPLE ? 'selected' : ''">People</div>
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
  }
}
</script>

<style>
.menu {
  margin-top: 80px;
  width: 200px;
}
.menu-item {
  padding: 10px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: blanchedalmond;
}

.selected {
  color: blue;
}
</style>