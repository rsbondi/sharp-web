<template>
  <div class="topbar">
    <div class="flex-columns">
      <div class="logo-search">
        <div class="menu-icon" @click="toggleMenu">
          <MenuIcon />
        </div>
        <div v-if="shownav" @click="toggleMenu" class="navmenu">
          <NavMenu/>
        </div>
        <a @click="loadFeed" class="logo" href="/">Health Explorer</a>
        <div class="search-box">
          <div class="search-box-group">
            <div class="search-box-icon">
              <SearchIcon />
            </div>
            <form @submit.prevent="search" action="#">
              <input v-model="searchQuery" type="text" placeholder="Search" class="search-box-input" value />
            </form>
          </div>
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-icons">
          <MessageIcon @click="loadMessages"/>
        </div>
        <div class="topbar-icons notification-wrapper" @click="loadNotifications">
          <NotificationIcon />
          <div v-show="unseen" class="unseen">{{unseen}}</div>
        </div>
        <button class="topbar-avatar-icon" @click="loadProfile"  
          @mouseover="showProfileMenu=true" @mouseleave="bye">
          <div class="topbar-icons topbar-avatar">
            <img
              :src="avatarUrl"
              class="topbar-avatar-img"
            />
          </div>
        </button>
        <div v-if="showProfileMenu" class="profile-menu"  
          @mouseover="stay" @mouseleave="bye">
          <a href="" @click.prevent="loadProfile">Profile</a>
          <a href="" @click.prevent="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchIcon from "./icons/SearchIcon.vue";
import MessageIcon from "./icons/MessageIcon.vue";
import MenuIcon from "./icons/MenuIcon.vue";
import NotificationIcon from "./icons/NotificationIcon.vue";
import NavMenu from './NavMenu.vue'
import { PAGE, IMAGE_BASE_URL, DEFAULT_AVATAR_URL } from '../constants'
import { userinfo, search } from "../api";


export default {
  components: {
    SearchIcon,
    MessageIcon,
    MenuIcon,
    NotificationIcon,
    NavMenu
  },
  computed: {
    avatarUrl() {
      return this.$store.state.avatar_image ?
        `${IMAGE_BASE_URL}/${this.$store.state.avatar_image}` :
        DEFAULT_AVATAR_URL // TODO default
    },
    unseen() {
      return this.$store.state.unseen
    }
  },
  data() {
    return {
      showProfileMenu: false,
      hoverTimer: null,
      searchQuery: '',
      shownav: false
    }
  },
  methods: {
    loadFeed(e) {
      e.preventDefault()
      this.$router.push('/')
    },
    loadMessages() {
      this.$router.push('messages')
    },
    loadNotifications() {
      this.$router.push('notifications')
    },
    loadProfile() {
      this.$store.commit('setcontent', {key: 'profileUser', data: -1})
      this.$router.push('profile')
      this.showProfileMenu = false;
    },
    bye() {
      this.hoverTimer = setTimeout(() => this.showProfileMenu = false, 1000)
    },
    stay() {
      clearTimeout(this.hoverTimer)
    },
    logout() {
      localStorage.removeItem('macaroon')
      document.location.reload()
    },
    search() {
      search(this.searchQuery).then(response => {
        if (response.success) {
          this.searchQuery = ''
          this.$store.commit('setcontent', {key: 'searchResults', data: response.results})
          this.$store.commit('setcontent', {key: 'currentComponent', data: 'SearchResults'})
        }
      }) 
    },
    toggleMenu() {
      this.shownav = !this.shownav
    }
  },
    mounted() {
    userinfo()
      .then((data) => {
        this.user = data.info;
        this.$store.commit('setuser', data.info)
        this.$store.commit('setcontent', {key: 'avatar_image', data: data.info.avatar_image})
        document.title = data.info.fullname;
      })
      .catch(console.error);
  },

};
</script>

<style scoped>
.unseen {
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 9px;
  left: 9px;
  color: white;
  width: 20px;
  height: 16px;
  text-align: center;
  padding-top: 4px;
  font-size: 0.7em;
  cursor: pointer;
}

.notification-wrapper {
  position: relative
}

.profile-menu {
  position: absolute;
    padding: 0.5em;
    top: 32px;
    border: 1px solid lightgray;
    background-color: white;
    right: 0;
}

.profile-menu a {
  text-decoration: none;
  display: block;
  margin: 0.5em;
}

.navmenu {
  margin-top: 232px;
  background-color: white;
  position: absolute;
  width: 100%;
  border: 1px solid lightgray;
  box-sizing: border-box;
}

@media (min-width: 1007px) {
  .navmenu {
    display: none;
  }
}
</style>

