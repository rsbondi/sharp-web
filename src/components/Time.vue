<template>
  {{displayTime}}
</template>

<script>
export default {
  props: {
    created_at: String
  },
  computed: {
    displayTime() {
      const created = Date.parse(this.created_at.replace(" ", "T") + "Z")
      const now = this.$store.state.timer
      const diffSecs = Math.floor((now - created) / 1000)
      if (diffSecs < 60) {
        return `${diffSecs} ${this.plural("second", diffSecs)}`
      } else if (diffSecs < 60 * 60) {
        const m = Math.floor(diffSecs / 60)
        return `${m} ${this.plural("minute", m)}`
      } else if (diffSecs < 60 * 60 * 24) {
        const h = Math.floor(diffSecs / 60 / 60)
        return `${h} ${this.plural("hour", h)}`
      }
      const days = Math.floor(diffSecs / 24 / 60 / 60)
      return days === 1 ? "yesterday" : `${days} days`

    },
  },
  methods: {
    plural(word, n) {
      return n === 1 ? word : `${word}s`
    }
  }
};
</script>