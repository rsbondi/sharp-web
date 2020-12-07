<template>
  <span v-if="chunks.length===1" v-linkable>{{chunks[0]}}</span>
  <div class="chunk" v-if="chunks.length > 1">
    <span  v-for="(chunk, index) in chunks" :key=index v-linkable>
      {{chunk}}
      <ProfileLink v-if="index < chunks.length-1" :user="mention(index)"/>
    </span>
  </div>
</template>

<script>
import ProfileLink from './ProfileLink.vue'
export default {
  props: {
    post: Object
  },
  components: {ProfileLink},
  methods: {
    mention(index) {
      const mention = this.post.mentions[index]
      mention.user_id = mention.id
      return mention
    }
  },
  computed: {
    chunks() {
      let content = this.post.content
      this.post.mentions.forEach(m => {
        content = content.replace(`@${m.username}`, `__${m.username}__`)
      })
      const chunks = content.split(/__[^\s]+__/g)
      return chunks
    }
  }
}
</script>

<style scoped>
.chunk {
  display: inline-block;
}
</style>