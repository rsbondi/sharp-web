<template>
  <div class="feed">
    <h2>Feed</h2>

    <input @keyup.enter="doPost" v-model="postContent" type="text" placeholder="New Post" />

    <ul>
      <li v-for="post in feedContent.posts" :key="post.id">
        <FeedItem :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import FeedItem from "./FeedItem";
import { post } from "../api"
import { PAGE } from "../constants"

export default {
  name: "Feed",
  components: {
    FeedItem,
  },
  data() {
    return {
      postContent: "",
    };
  },
  computed: {
    feedContent() {
      return this.$store.state.feed;
    },
  },
  methods: {
    doPost() {
      post(this.postContent).then(response => {
        this.postContent = ""
        this.$store.dispatch('getfeed')
      }).catch(console.log)
    }
  },
  mounted() {
    this.$store.dispatch("setpage", PAGE.FEED);
  }
};
</script>

<style>
</style>
