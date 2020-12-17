<template>
  <div class="person">
    <div class="person-img-container" v-if="person.avatar_image">
      <img class="person-avatar-img" :src="`${IMAGE_BASE_URL}/${person.avatar_image}`"/>
    </div>
    <div class="person-img-container" v-if="!person.avatar_image">
      <img class="person-avatar-img" :src="DEFAULT_AVATAR_URL"/>
    </div>
    {{person.fullname}} <ProfileLink :user="profileUser" />
    <div class="flex-container">
      <div>Posts: {{person.posts}}</div>
      <div>Likes: {{person.likes}}</div>
      <div>Followers: {{person.followers}}</div>
      <div>Following: {{person.following}}</div>
    </div>
    <div class="flex-container">
      <div class="request">
        <div v-if="isOfferingAccountability && !isAccountability">
          <button @click="showAcceptAccountability=true">Request Accountability</button>
          <AcceptRequest
            v-if="showAcceptAccountability"
            :accept="requestAccountability"
            :reject="() => showAcceptAccountability=false"
          >
            <p>
              Accountability partnering is an important element to your success.
              By parnering with another, you are making a commitment to provide mutual support.
              You agree to be a good listener and support whatever issues are presented.
              Also you will be seeking support with your issues.
              Try to avoid giving unsolicited advice.
              These are suggested guidelines, but you are free to interact in any way as long
              as in agreement with your partner.  We wish you success in partnering.
            </p>
          </AcceptRequest>
        </div>
        <div class="status">{{accountabilityStatus}}</div>
      </div>
      <div class="request">
        <div v-if="isOfferingMentor && !isMentor">
          <button @click="showAcceptMentor=true">Request For Mentoring</button>
          <AcceptRequest
            v-if="showAcceptMentor"
            :accept="requestMentor"
            :reject="() => showAcceptMentor=false"
          >
            <p>
              A mentor will be your guide.  They should have more experience and can help
              you through whatever issues you may encounter on your health journey.
              They are volunteers so be respectful of their efforts and time.
              They only offer help the best they can, ultimately any decisions about your
              health are yours to make and yours only.
              You will be able to rate your mentor if they accept. Best of luck with
              With your potential partnership.
            </p>
          </AcceptRequest>
        </div>
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
import { IMAGE_BASE_URL, REQUEST, DEFAULT_AVATAR_URL } from '../constants'
import { request, follow } from '../api'
import ProfileLink from './ProfileLink.vue'
import Rating from './Rating.vue'
import AcceptRequest from './AcceptRequest.vue'

export default {
  name: "Person",
  props: {
    person: Object
  },
  components: {
    ProfileLink, Rating, AcceptRequest
  },
  data() {
    return {
      IMAGE_BASE_URL,
      DEFAULT_AVATAR_URL,
      REQUEST,
      showAcceptAccountability: false,
      showAcceptMentor: false,
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
      const status = this.person.request_status.split(',')
      status.push(''+REQUEST.STATUS.PENDING)
      this.person.request_status = status.join(',')
},
    requestAccountability() {
      request(REQUEST.TYPE.ACCOUNTABILITY, this.person.id).then(data => {
        if (data.success) {
          this.updateRequest(REQUEST.TYPE.ACCOUNTABILITY)
          this.showAcceptAccountability = false
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
          this.person.followers = data.followers
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
  box-sizing: border-box;
}

.person-avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.person-img-container {
  margin-right: 0;
  margin-left: 1em;
}

.person .flex-container div {
  width: 50%;
}

@media (min-width: 1007px) {
  .person .flex-container div {
    width: 160px;
  }
  .person-img-container {
    float: left;
    margin-right: 1em;
  }
  .person-img-container {
    float: left;
    margin-right: 1em;
  }
}


.person .flex-container {
  margin-top: 10px;;
  flex-wrap: wrap;
}

.person .flex-container div.request {
  width: 100%;
  margin: 0.3em 0;
}

@media (min-width: 1007px) {
  .person .flex-container div.request {
    width: 220px;
  }
}

.status {
  font-style: italic;
  color: lightslategray
}

</style>