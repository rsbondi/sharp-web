<template>
  <div class="person">
    <div class="person-img-container" v-if="person.avatar_image">
      <img class="person-avatar-img" :src="`${IMAGE_BASE_URL}/${person.avatar_image}`"/>
    </div>
    <div class="person-img-container" v-if="!person.avatar_image">
      <div class="person-avatar-img">&nbsp;</div>
    </div>
    {{person.fullname}} <em>{{person.username}}</em>
    <div class="flex-container">
      <div>Total posts: {{person.posts}}</div>
      <div>Likes received: {{person.likes}}</div>
      <div>Followers: {{person.followers}}</div>
      <div>Following: {{person.following}}</div>
    </div>
    <div class="flex-container">
      <div class="request">
        <button v-if="isOfferingAccountability && !isAccountability" @click="requestAccountability">Request Accountability Partner</button>
      </div>
      <div class="request">
        <button v-if="isOfferingMentor && !isMentor" @click="requestMentor">Request For Mentoring</button>
      </div>
      <div class="request">
        <button @click="follow">{{person.ifollow ? 'Unfollow' : 'Follow'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { IMAGE_BASE_URL, REQUEST } from '../constants'
import { request, follow } from '../api'

export default {
  name: "Person",
  props: {
    person: Object
  },
  data() {
    return {
      IMAGE_BASE_URL: IMAGE_BASE_URL,
      REQUEST: REQUEST,
    }
  },
  computed: {
    isOfferingAccountability() {
      return !!~this.person.offerings.split(',').indexOf(''+REQUEST.TYPE.ACCOUNTABILITY)
    },
    isAccountability() {
      return !!~this.person.requests.split(',').indexOf(''+REQUEST.TYPE.ACCOUNTABILITY)
    },
    isOfferingMentor() {
      return !!~this.person.offerings.split(',').indexOf(''+REQUEST.TYPE.MENTOR)
    },
    isMentor() {
      return !!~this.person.requests.split(',').indexOf(''+REQUEST.TYPE.MENTOR)
    },
  },
  methods: {
    requestAccountability() {
      request(REQUEST.TYPE.ACCOUNTABILITY, this.person.id).then(data => {
        if (data.success) {
          // TODO:
        }
      })
    },
    requestMentor() {
      request(REQUEST.TYPE.MENTOR, this.person.id).then(data => {
        if (data.success) {
          // TODO:
        }
      })
    },
    follow() {
      follow(this.person.id).then(data => {
        if (data.success) {
          this.person.ifollow = data.action === 'follow'
        }
      })
    },
  }
}
</script>

<style scoped>
.person {
  width: 100%;
  border: 1px solid lightgray;
  padding: 10px;
  margin-bottom: 1em;
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

.person .flex-container div {
  width: 160px;

}

.person .flex-container {
  margin-top: 10px;;
}

.person .flex-container div.request {
  width: 220px;
}

</style>