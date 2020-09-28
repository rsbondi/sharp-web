<template>
  <div>
    {{comment.fullname}} <em>{{comment.username}}</em>
  </div>
  <div>
    {{showTime(comment.created_at)}}
  </div>
  <div class="comment-content">
    {{comment.content}}
  </div>
  <div v-if="comment.likes">
    likes: {{comment.likes}}
  </div>
</template>

<script>
import { showTime } from '../util'
export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  methods: {
    showTime: showTime
  }
}
</script>

<style>

</style>
