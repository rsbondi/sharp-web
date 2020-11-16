<template>
  <div class="body-component">
    <ul>
      <li @click="setMode('browse')" :class="mode==='browse' ? 'selected' : ''">Browse</li>
      <li @click="setMode('create')" :class="mode==='create' ? 'selected' : ''">Create</li>
      <li @click="setMode('help')" :class="mode==='help' ? 'selected' : ''" title="info">🛈</li>
    </ul>
    <div v-if="mode==='create'">
     <ProgramCreate/>
    </div>
    <div v-if="mode==='browse'">
      <Programs/>
    </div>
    <div v-if="mode==='help'">
      <ProgramHelp/>
    </div>
    <div v-if="mode==='feed'">
      <ProgramFeed/>
    </div>
  </div>
</template>

<script>
import ProgramCreate from './ProgramCreate.vue'
import Programs from './Programs.vue'
import ProgramFeed from './ProgramFeed.vue'
import ProgramHelp from './ProgramHelp.vue'
export default {
  components: { ProgramCreate, Programs, ProgramFeed, ProgramHelp },
  computed: {
    mode() {
      return this.$store.state.programView
    }
  },
  methods: {
    setMode(mode) {
      this.$store.commit('setcontent', {key: 'programView', data: mode})
    }
  }
}
</script>

<style scoped>
  li {
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    color: #999999;
  }

  .selected {
    color: cornflowerblue;
    text-decoration: underline;
  }
</style>