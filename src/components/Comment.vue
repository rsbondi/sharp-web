<template>
  <div>
    {{comment.fullname}} <em>{{comment.username}}</em>
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
export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  components: { Time }
}
</script>

<style>

</style>
