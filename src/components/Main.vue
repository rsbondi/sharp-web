<template>
  <TopBar></TopBar>
  <div class="main-content sidebars">
    <div class="flex-columns sides">
      <div class="logo-search">
        <div class="nav-menu">
          <NavMenu/>
        </div>

      </div>
      <div class="main-right">
      <Actions/>

      </div>
    </div>
  </div>
  <div class="flex-container">
    <router-view>
      <div class="body-component">
        <keep-alive>
          <component :is="currentComponent" />
        </keep-alive>
      </div>
    </router-view>

  </div>
</template>

<script>
import TopBar from "./TopBar.vue";
import NavMenu from "./NavMenu"
import Feed from "./Feed.vue";
import Messages from "./Messages.vue";
import Profile from "./Profile.vue"
import People from "./People"
import Notifications from "./Notifications.vue";
import Actions from "./Actions.vue";
import Post from "./Post.vue";
import Follows from "./Follows.vue"
import Program from "./Program.vue"
import SearchResults from "./SearchResults.vue"

export default {
  name: "Main",
  components: {
    TopBar,
    NavMenu,
    Feed,
    Messages,
    Profile,
    People,
    Notifications,
    Actions,
    Post,
    Follows,
    Program,
    SearchResults
  },
  data() {
    return {
      which: "Feed",
    };
  },
  computed: {
    currentComponent() {
      return this.$store.state.currentComponent;
    },
  },
  mounted() {
    setInterval(() => {
      switch (this.currentComponent) {
        case 'Feed':
          this.$store.dispatch('getfeed')
          break;
        case 'Messages':

          break;
        
      }
      this.$store.dispatch('newnotifications')
      this.$store.commit('setcontent', {key: "timer", data: new Date()})
    }, 30000)
  }
};
</script>

<style scoped>
.fill {
  width: 200px;
}
.sides {
  top: 0;
  align-items: flex-start;
  height: 0;
}
.nav-menu {
  display: none;
}
@media (min-width: 1007px) {
  .sides {
    width: 1250px;
  }
  .nav-menu {
    display: block;
  }
}
.sidebars {
  border-bottom: none;
  z-index: 25;
  height: 0;
}
</style>
