<template>
  <h2>Program</h2>
  <ProgramItem :program="program" />
  <div class="body-content">
    
    <input @keyup.enter="doPost" v-model="postContent" type="text" placeholder="New Post" />

    <ul>
      <li v-for="post in posts" :key="post.id">
        <FeedItem :post="post" />
      </li>
    </ul>

  </div>

</template>

<script>
import { computed } from 'vue'
import ProgramItem from './ProgramItem'
import FeedItem from './FeedItem'
import { feed, post } from '../api'
import { toISO8601String } from '../util'

export default {
  components: { ProgramItem, FeedItem },
  data() {
    return {
      posts: [],
      last: null,
      postContent: ""
    }
  },
  computed: {
    program() {
      return this.$store.state.currentProgram
    },
  },
  mounted() {
    this.getFeed()
  },
  methods: {
    doPost() {
      post(this.postContent, this.$store.state.currentProgram.id).then(response => {
        this.postContent = ""
        this.getFeed(this.last)
      }).catch(console.log)
    },
    getFeed(last) {
      feed(last, this.$store.state.currentProgram.id).then(result => {
        if (result.success) {
          this.posts.unshift(...result.posts)
          this.last = toISO8601String(new Date())
        }
      })
    }
  }
}
</script>

<style scoped>
.feed {
  margin-top: 2em;
}
</style>