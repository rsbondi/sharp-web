<template>
  <div class="topbar">
    <div class="flex-columns">
      <div class="logo-search">
        <div class="menu-icon">
          <MenuIcon />
        </div>
        <a @click="loadFeed" class="logo" href="/">Health Explorer</a>
        <div class="search-box">
          <div class="search-box-group">
            <div class="search-box-icon">
              <SearchIcon />
            </div>
            <input type="text" placeholder="Search" class="search-box-input" value />
          </div>
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-icons">
          <MessageIcon @click="loadMessages"/>
        </div>
        <div class="topbar-icons">
          <NotificationIcon @click="loadNotifications" />
        </div>
        <button class="topbar-avatar-icon" @click="loadProfile">
          <div class="topbar-icons topbar-avatar">
            <img
              src="https://res.cloudinary.com/dj92lnawi/image/upload/v1598407927/user/eddc6e99-61b5-4c07-82c5-76739fc0721d.png"
              class="topbar-avatar-img"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchIcon from "./icons/SearchIcon.vue";
import MessageIcon from "./icons/MessageIcon.vue";
import MenuIcon from "./icons/MenuIcon.vue";
import NotificationIcon from "./icons/NotificationIcon.vue";
import { PAGE } from '../constants'

export default {
  components: {
    SearchIcon,
    MessageIcon,
    MenuIcon,
    NotificationIcon,
  },
  methods: {
    loadFeed(e) {
      e.preventDefault()
      this.$store.dispatch("setpage", PAGE.FEED);
    },
    loadMessages() {
      this.$store.dispatch("setpage", PAGE.MESSAGES);
    },
    loadNotifications() {
      this.$store.dispatch("setpage", PAGE.NOTIFICATIONS);
    },
    loadProfile() {
      this.$store.dispatch("setpage", PAGE.PROFILE);
    }
  },
};
</script>

