<template>
  <a href="" @click.prevent="setProfileUser"><em>{{user.username}}</em></a>
</template>

<script>
export default {
  props: {
    user: Object
  },
  methods: {
    setProfileUser() {
      this.$store.commit('setcontent', {key: 'profileUser', data: this.user.user_id})
      this.$router.push('/profile')
    }
  }
}
</script>