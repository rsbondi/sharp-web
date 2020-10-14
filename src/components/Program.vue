<template>
  <div class="body-component">
    <ul>
      <li @click="mode='browse'" :class="mode==='browse' ? 'selected' : ''">Browse</li>
      <li @click="mode='create'" :class="mode==='create' ? 'selected' : ''">Create</li>
    </ul>
    <ProgramCreate v-if="mode==='create'"/>
    <Programs v-if="mode==='browse'"/>
  </div>
</template>

<script>
import ProgramCreate from './ProgramCreate.vue'
import Programs from './Programs.vue'
export default {
  components: { ProgramCreate, Programs },
  data() {
    return {
      mode: 'browse'
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