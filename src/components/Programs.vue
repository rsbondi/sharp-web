<template>
  <h2>Browse Programs</h2>
  <ul>
    <li v-for="program in programs" :key="program.id">
      <ProgramItem :program="program" />
    </li>
  </ul>
</template>

<script>
  import { programs } from '../api'
  import ProgramItem from './ProgramItem'
export default {
  data() {
    return {
      programs: []
    }
  },
  components: { ProgramItem },
  mounted() {
    programs().then(result => {
      this.programs = result.programs
    }) 
  }
}
</script>