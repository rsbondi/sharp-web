<template>
  <div class="fullname">{{user.fullname}}</div>
  <div v-if="user.bio" class="flex-container">
    <div class="bio" v-linkable>{{user.bio}}</div>
  </div>
  <div class="flex-container">
    <div class="follow"><a href="" @click.prevent="following">Following {{user.following}}</a></div>
    <div class="follow"><a href="" @click.prevent="followers">Followers {{user.followers}}</a></div>
  </div>
</template>

<script>
import { PAGE } from '../constants'
export default {
  props: {
    user: Object
  },
  methods: {
    following() {
      this.$store.commit('setcontent', {key: 'currentUser', data: this.user.id})
      this.$store.commit('setcontent', {key: 'currentList', data: 'Following'})
      this.$router.push('/follows')
      this.$store.dispatch('setpage', PAGE.FOLLOWS)
    },
    followers() {
      this.$store.commit('setcontent', {key: 'currentUser', data: this.user.id})
      this.$store.commit('setcontent', {key: 'currentList', data: 'Followers'})
      this.$router.push('/follows')
      this.$store.dispatch('setpage', PAGE.FOLLOWS)
    }
  }
}
</script>

<style scoped>
  .follow {
    margin-top: 1em;
    width: 100px;
  }

  .fullname {
    font-size: 1.15em;
  }

  .bio {
    margin-top: 1em;
    text-align: left;
  }
</style>