<template>
  <div class="body-content rel">
      <h2>Browse Programs</h2>
      <a v-if="filtered" @click.prevent="clearFilter" class="close" href="#">View all</a>
      <ul>
        <li v-for="program in programs" :key="program.id">
          <ProgramItem :program="program" />
        </li>
      </ul>
  </div>
</template>

<script>
  import { programs } from '../api'
  import ProgramItem from './ProgramItem'
export default {
  computed: {
    programs() {
      if (this.filtered) {
        return this.$store.state.programs.filter(p => p.id === this.$store.state.programFilter)
      } else {
        return this.$store.state.programs
      }
    },
    filtered() {
      return this.$store.state.programFilter !== -1
    }
  },
  components: { ProgramItem },
  methods: {
    clearFilter() {
      this.$store.commit('setcontent', {key: 'programFilter', data: -1})
    }
  },
  mounted() {
    programs().then(result => {
      this.$store.commit('setcontent', {key: 'programs', data: result.programs})
    }) 
  }
}
</script>

<style scoped>
  .close {
    position: absolute;
    right: 20px;
    top: -8px;
  }

  .rel {
    position: relative;
  }
</style>