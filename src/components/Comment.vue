<template>
  <div>
    <div class="feed-img-container" v-if="comment.avatar_image">
      <img class="feed-avatar-img" :src="`${IMAGE_BASE_URL}/${comment.avatar_image}`"/>
    </div>
    {{comment.fullname}} <ProfileLink :user="comment" />
  </div>
  <div>
    <Time :created_at="comment.created_at" />
  </div>
  <div class="comment-content">
    {{comment.content}}
  </div>
  <div v-if="comment.likes">
    likes: {{comment.likes}}
  </div>
</template>

<script>
import Time from './Time.vue'
import ProfileLink from './ProfileLink.vue'
import { IMAGE_BASE_URL } from '../constants'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  components: { Time, ProfileLink },
  data() {
    return {
      IMAGE_BASE_URL
    }
  }
}
</script>

<style>

</style>
