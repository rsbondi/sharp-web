<template>
  <div class="body-component">
    <h2>Results</h2>
    <ul>
      <li v-for="(result, index) in results" :key="index" class="search-result">
        <a href="#" @click.prevent="select(index)"><div>{{result.ref}} - <em>{{result.type}}</em></div></a>
        <div>{{result.detail}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {PAGE} from '../constants'
export default {
  computed: {
    results() {
      return this.$store.state.searchResults
    }
  },
  methods: {
    select(index) {
      const item = this.results[index]
      switch(item.type) {
        case 'user':
          this.$store.commit('setcontent', {key: 'profileUser', data: item.id})
          this.$store.dispatch('setpage', PAGE.PROFILE)
          this.$store.commit('setcontent', {key: 'currentComponent', data: 'Profile'})
          this.$router.push('/profile#') // hack to sync feed if going to your profile after search
          break;
        case 'program':
          this.$store.commit('setcontent', {key: 'programView', data: 'browse'})
          this.$store.commit('setcontent', {key: 'programFilter', data: item.id})
          this.$store.commit('setcontent', {key: 'currentComponent', data: 'Program'})
          this.$store.dispatch('setpage', PAGE.PROGRAM)
          this.$router.push('/program')
          break;
        case 'program_phase':
          this.$store.commit('setcontent', {key: 'programView', data: 'browse'})
          this.$store.commit('setcontent', {key: 'currentComponent', data: 'Program'})
          this.$store.commit('setcontent', {key: 'programFilter', data: item.parent})
          this.$store.dispatch('setpage', PAGE.PROGRAM)
          this.$router.push('/program')
          break;
      }
    }
  }
}
</script>

<style scoped>
  .search-result {
    padding: 0 0.5em;
    margin-bottom: 1em;
  }
</style>