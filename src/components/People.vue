<template>
  <div class="people">
    <h2>People</h2>
    <ul>
      <li v-for="person in people" :key="person.id">
        <Person :person="person" />
      </li>
    </ul>
  </div>  
</template>


<script>
import { userlist } from '../api'
import Person from "./Person"
export default {
  name: "People",
  data() {
    return {
      people:[]
    }
  },
  mounted() {
    userlist().then(data => {
      this.people = data.info
    })
  },
  components: {Person}
}
</script>

<style>
.people {
  width: 800px;
}
</style>