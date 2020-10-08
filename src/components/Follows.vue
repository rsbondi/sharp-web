<template>
  <div class="people">
    <h2>{{page}}</h2>
    <div class="person-img-container" v-if="who.avatar_image">
      <img class="person-avatar-img" :src="`${IMAGE_BASE_URL}/${who.avatar_image}`"/>
    </div>

    {{who.fullname}}
    <ul>
      <li v-for="person in list" :key="person.id">
        <Person :person="person" />
      </li>
    </ul>
  </div>
  <div class="noshow">{{user}}</div>
</template>

<script>
import { follows, user } from '../api'
import Person from './Person.vue'
import { IMAGE_BASE_URL } from '../constants'

export default {
  components: {Person},
  data() {
    return {
      followers: [], 
      following: [],
      who: {},
      IMAGE_BASE_URL: IMAGE_BASE_URL
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
    page() {
      return this.$store.state.currentList
    },
    list() {
      return this.$store.state.currentList === 'Following' ? this.following : this.followers
    }
  },
  methods: {
    loadFollows() {
      follows(this.$store.state.currentUser).then(result => {
        this.followers = result.followers
        this.following = result.following
        user(this.$store.state.currentUser).then(result => {
          this.who = result.user
        })

      })
    }
  },
  watch: {
    user() {
      this.loadFollows()
    },
  },
  mounted() {
    this.loadFollows()
  }
}
</script>

<style scoped>
.people {
  width: 800px;
}
.noshow {
  height: 0;
}
.person-avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.person-img-container {
  float: left;
  margin-right: 1em;
}

ul {
  margin-top: 48px;
}
</style>