<template>
  <div class="person">
    <div class="person-img-container" v-if="person.avatar_image">
      <img class="person-avatar-img" :src="`${IMAGE_BASE_URL}/${person.avatar_image}`"/>
    </div>
    <div class="person-img-container" v-if="!person.avatar_image">
      <div class="person-avatar-img">&nbsp;</div>
    </div>
    {{person.fullname}} <ProfileLink :user="profileUser" />
    <div class="flex-container">
      <div>Total posts: {{person.posts}}</div>
      <div>Likes received: {{person.likes}}</div>
      <div>Followers: {{person.followers}}</div>
      <div>Following: {{person.following}}</div>
    </div>
    <div class="flex-container">
      <div class="request">
        <button v-if="isOfferingAccountability && !isAccountability" @click="requestAccountability">Request Accountability Partner</button>
        <div class="status">{{accountabilityStatus}}</div>
      </div>
      <div class="request">
        <button v-if="isOfferingMentor && !isMentor" @click="requestMentor">Request For Mentoring</button>
        <div class="status">{{mentorStatus}}</div>
      </div>
      <div class="request">
        <button @click="follow">{{person.ifollow ? 'Unfollow' : 'Follow'}}</button>
      </div>
    </div>
    <div v-if="isOfferingMentor" class="flex-container">
      <Rating 
        :id="person.id"
        :rating="person.rating" 
        :nratings="person.nratings"
        :type="1"
        :readonly="!person.mymentor"
        :updateRating="rated"
      />

    </div>

  </div>
</template>

<script>
import { IMAGE_BASE_URL, REQUEST } from '../constants'
import { request, follow } from '../api'
import ProfileLink from './ProfileLink.vue'
import Rating from './Rating.vue'

export default {
  name: "Person",
  props: {
    person: Object
  },
  components: {
    ProfileLink, Rating
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
    profileUser() {
      return {username: this.person.username, user_id: this.person.id}
    },
    mentorStatus() {
      if (this.person.mymentor) {
        return 'your mentor'
      } else if (this.isMentor) {
        return 'mentor pending'
      }
      return ''
    },
    accountabilityStatus() {
      if (this.isAccountability) {
        const accountabilityIndex = this.person.requests.split(',').indexOf(''+REQUEST.TYPE.ACCOUNTABILITY)
        const status = this.person.request_status.split(',')
        const statusNum = parseInt(status[accountabilityIndex], 10)
        if (statusNum === REQUEST.STATUS.PENDING) {
          return 'accountability pending'
        } else if (statusNum === REQUEST.STATUS.ACTIVE) {
          return 'your partner'
        }
      }
      return ''
    }
  },
  methods: {
    updateRequest(requestType) {
      const parts = this.person.requests.split(',')
      parts.push(requestType)
      this.person.requests = parts.join(',')
    },
    requestAccountability() {
      request(REQUEST.TYPE.ACCOUNTABILITY, this.person.id).then(data => {
        if (data.success) {
          this.updateRequest(REQUEST.TYPE.ACCOUNTABILITY)
        }
      })
    },
    requestMentor() {
      request(REQUEST.TYPE.MENTOR, this.person.id).then(data => {
        if (data.success) {
          this.updateRequest(REQUEST.TYPE.MENTOR)
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
    rated(rating, nratings, reviews) {
      this.person.rating = rating
      this.person.nratings = nratings
      this.person.reviews = reviews
    }

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

.status {
  font-style: italic;
  color: lightslategray
}

</style>