<template>
  <div class="feed">
    <h2>Post</h2>
    <FeedItem :post="post" :expandComments="true"/>
  </div>
</template>

<script>
import FeedItem from './FeedItem'
export default {
  name: 'Post',
  components: { FeedItem },
  data() {
    return {
      post: {
        username: '',
        fullname: '',
        created_at: '',
        content: '',
        comments: []
      }
    }
  },
  mounted() {
    this.post = this.$store.state.feed.posts.find(e => e.id === this.$store.state.activePost)
    this.$store.commit('setcontent', {key: 'activePost', data: -1})
    this.$store.commit('setcontent', {key: 'activeComment', data: -1})
  }
}
</script>