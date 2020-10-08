<template>
  <div class="people">
    <h2>People</h2>
    <div class="filter">
      <label><input type="checkbox" v-model="mentor" @click="setMentor" /> mentor </label>
    </div>
    <div class="filter">
      <label><input type="checkbox" v-model="accountability" @click="setAccountability"/> accountability </label>
    </div>
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
      people:[],
      accountability: false,
      mentor: false
    }
  },
  mounted() {
    userlist().then(data => {
      this.people = data.info
    })
  },
  components: {Person},
  methods: {
    setFilter(accountability, mentor) {
      let filter = {}
      if (accountability || mentor) {
        filter.accountability = accountability ? 1 : 0
        filter.mentor = mentor ? 1 : 0
      }
    userlist({filter}).then(data => {
      this.people = data.info
    })
    },
    setAccountability(e) {
      this.setFilter(e.target.checked, this.mentor)
    },
    setMentor(e) {
      this.setFilter(this.accountability, e.target.checked)
    },
  }
}
</script>

<style scoped>
.people {
  width: 800px;
}

.filter {
  float: right;
  position: relative;
  top: -40px;
  width: 132px;
}

.filter:first-child {
  width: auto;
}
</style>