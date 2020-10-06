<template>
  <TopBar></TopBar>
  <div class="flex-container">
    <NavMenu/>
    <router-view>
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </router-view>

    <div class="fill">
      <Actions/>
    </div>
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
    Post
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
    }, 15000)
  }
};
</script>

<style scoped>
.fill {
  width: 200px;
}
</style>
