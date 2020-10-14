<template>
  <div class="program-item">
    <div class="phase">
      <div class="flex-container">
        <div class="info">{{program.name}}</div>
        <div class="info">Level: {{program.level}}</div>
      </div>
      <div class="desc">{{program.description}}</div>
    <div v-for="phase in program.phases" :key=phase.id>
      <div class="flex-container">
        <div class="info">{{phase.name}}</div>
        <div class="info">Level: {{phase.level}}</div>
      </div>
      <div class="desc">{{phase.description}}</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    program: Object
  }
}
</script>

<style scoped>
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
.info:first-child {
  font-weight: 600;
}
</style>