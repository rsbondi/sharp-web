<template>
  <div class="actions">
    <h3>Your Partners</h3>
    <div v-if="!actions.length" class="action-verbiage">
      You currently are not paired with anyone.
      Try <span @click="goPeople" class="action-link">searching</span>  for accountability partners or mentors.
      Also, under your <span @click="goProfile" class="action-link">profile</span>
       you can make yourself available 
      as a mentor or accountability partner.
    </div>
    <ul>
      <li v-for="action in actions" :key="action.contact+action.relation">
        <Action :action="action" />
      </li>
    </ul>
  </div>
</template>

<script>
import { actions } from '../api'
import Action from './Action'
import { PAGE } from "../constants"

export default {
  name: "Actions",
  components: {Action},
  data() {
    return {
      actions: []
    }
  },
  methods: {
    goPeople() {
      this.$store.dispatch('setpage', PAGE.PEOPLE)
    },
    goProfile() {
      this.$store.dispatch('setpage', PAGE.PROFILE)
    },
  },
  computed: {
    actions() {
      return this.$store.state.actions
    }
  },
  mounted() {
    this.$store.dispatch('getactions')
  }
}
</script>

<style>
.actions {
  width: 200px;
  margin-top: 80px;
  margin-left: 40px;
}

.action-verbiage {
  font-style: italic;
  font-size: 0.8em;
}

.action-link {
  cursor: pointer;
  color: blue;
}
</style>