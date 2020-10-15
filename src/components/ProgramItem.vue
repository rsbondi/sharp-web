<template>
  <div class="program-item">
    <div class="phase">
      <div class="flex-container">
        <div class="info">{{program.name}}</div>
        <div class="info">Level: {{program.level}}</div>
        <div class="info">Members: {{program.members}}</div>
        <div class="info mystatus">
          {{mine}}
          <button @click="joinProgram" v-if="!mine">Join</button>
        </div>
      </div>
      <div class="desc">{{program.description}}</div>
    <div v-for="phase in program.phases" :key=phase.id>
      <div class="flex-container">
        <div class="info">{{phase.name}}</div>
        <div class="info">Level: {{phase.level}}</div>
        <div class="info">&nbsp;</div>
        <div class="info">&nbsp;</div>
      </div>
      <div class="desc">{{phase.description}}</div>
    </div>
    </div>
  </div>
</template>

<script>
import { participate } from '../api'
export default {
  props: {
    program: Object
  },
  methods: {
    joinProgram() {
      participate(this.program.id).then(result => {
        console.log(result)
        this.program.member = 1
        this.program.members++
      })
    }
  },
  computed: {
    mine() {
      if (this.program.creator) return 'you created'
      if (this.program.member) return 'you joined'
      return ''
    }
  }
}
</script>

<style scoped>
.phase {
  margin-top: 2em;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0.5em 0.5em 0.5em rgba(0,0,0,0.2)
}
.desc {
  padding: 1em;
}
.info {
  width: 25%;
  padding: 1em;
}
.info:first-child {
  font-weight: 600;
}
.mystatus {
  font-style: italic;
  color: lightslategray
}
</style>