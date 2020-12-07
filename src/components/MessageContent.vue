<template>
  <div class="message" :class="message.mine ? 'mine' : 'theirs'" v-linkable>
    {{message.content}}
  </div>
  <div class="msgtime clear" :class="message.mine ? 'mytime' : 'theirtime'">
    <Time :created_at="message.created_at"/>
  </div>
</template>

<script>
import Time from './Time.vue'

export default {
  props: {
    message: Object
  },
  components: {
    Time
  },
}
</script>