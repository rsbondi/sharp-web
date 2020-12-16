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
  methods: {
    updatePost() {
      const post = this.$store.state.feed.posts.find(e => e.id === this.$store.state.activePost)
      if (post) {
        this.post = post
        this.$store.commit('setcontent', {key: 'activePost', data: -1})
        this.$store.commit('setcontent', {key: 'activeComment', data: -1})
      }
    }
  },
  mounted() {
    this.updatePost()
  },
  watch: {
    $route (to, from) {
      if (to.path === "/post") {
        this.updatePost()
      }
    }
  }
}
</script>