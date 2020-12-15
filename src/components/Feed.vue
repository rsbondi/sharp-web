<template>
  <div class="body-component">
    <h2>Feed</h2>

    <PostInput :post="doPost" ref="postinput" placeholder="New Post" />

    <ul>
      <li v-for="post in feedContent.posts" :key="post.id">
        <FeedItem :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import FeedItem from "./FeedItem";
import PostInput from "./PostInput"
import { post } from "../api"
import { PAGE } from "../constants"

export default {
  name: "Feed",
  components: {
    FeedItem, PostInput
  },
  computed: {
    feedContent() {
      return this.$store.state.feed;
    },
  },
  methods: {
    doPost() {
      return post(this.$refs.postinput.value).then(response => {
        this.$store.dispatch('getfeed')
      }).catch(console.log)
    }
  }
};
</script>

<style>
</style>
