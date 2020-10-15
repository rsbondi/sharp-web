<template>
  <div class="body-component">
    <h2>Create Program</h2>
    <form @submit.prevent="doCreate">
      <h3>Initial Phase</h3>
      <div class="phase">
        <div class="flex-container">
          <div class="info">
            <label>Name</label>
            <input v-model="name" type="text" placeholder="program name" class="program-input" />
          </div>
          <div class="info">
            <label>Level</label>
            <input v-model="level" type="number" min="0" max="100" placeholder="level" class="program-input" />
          </div>
        </div>
        <div class="desc">
          <label>Description</label>
          <textarea v-model="description" placeholder="program description" class="program-input"></textarea>
        </div>
      </div>

      <h3>Additional Phases</h3>

      <div v-for="phase in phases" :key="phase.id" class="phase">
        <div class="flex-container">
          <div class="info">
            <label>Name</label>
            <input v-model="phase.name" type="text" placeholder="phase name" class="program-input" />
          </div>
          <div class="info">
            <label>Level</label>
            <input v-model="phase.level" type="number" min="0" max="100" placeholder="level" class="program-input" />
          </div>
        </div>
        <div class="desc">
          <label>Description</label>
          <textarea v-model="phase.description" placeholder="phase description" class="program-input"></textarea>
        </div>
      </div>

      <button type="button" @click="newPhase">Add Phase</button>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>    
  </div>
</template>

<script>
import { addprogram } from '../api'
export default {
  data() {
    return {
      name: "",
      description: "",
      level: 0,
      phases: []
    }
  },
  methods: {
    newPhase() {
      this.phases.push({id: this.phases.length, name: "", description: "", level: 0})
    },
    doCreate(e) {
      const { name, description, level, phases } = this
      const program = { name, description, level, phases }
      addprogram(program).then(console.log) // TODO: handle response
    }
  }
  
}
</script>

<style scoped>
.program-input {
  width: 100%;
  clear: both;
}
textarea.program-input {
  height: 150px;
}
  button {
  clear: both;
  margin-top: 1.5em;
}
.phase {
  margin-top: 2em;
  border: 1px solid lightgray;
  border-radius: 5px;
}
.desc {
  padding: 1em;
}
.info {
  width: 50%;
  padding: 1em;
}
</style>