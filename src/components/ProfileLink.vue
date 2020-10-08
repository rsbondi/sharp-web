<template>
  <a href="" @click.prevent="setProfileUser" @mouseover="showInfo" @mouseleave="bye"><em>{{user.username}}</em></a>
  <div class="rel" v-show="showHover">
    <div class="hover-content" @mouseover="stay" @mouseleave="bye">
      <UserInfo :user="userDetails" />
    </div>
  </div>
</template>

<script>
import UserInfo from './UserInfo.vue'
import { userinfo } from '../api'

export default {
  props: {
    user: Object
  },
  components: { UserInfo },
  data() {
    return {
      showHover: false,
      hoverTimer: null,
      userDetails: {}
    }
  },
  methods: {
    setProfileUser() {
      this.$store.commit('setcontent', {key: 'profileUser', data: this.user.user_id})
      this.$router.push('/profile')
    },
    showInfo() {
      userinfo(this.user.user_id).then(response => {
        if (response.success) {
          this.userDetails = response.info
        }
      })
      this.showHover = true
    },
    bye() {
      this.hoverTimer = setTimeout(() => this.showHover = false, 1000)
    },
    stay() {
      clearTimeout(this.hoverTimer)
    }
  }
}
</script>

<style scoped>
  .rel {
    position: relative;
  }

  .hover-content {
    position: absolute;
    width: 400px;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: white;
    padding: 2em;
    left: 60px;
    top: 8px;
  }
</style>