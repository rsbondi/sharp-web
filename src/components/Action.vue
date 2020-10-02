<template>
  <div class="action">
    <div class="action-img-container" v-if="action.avatar_image">
      <img class="action-avatar-img" :src="`${IMAGE_BASE_URL}/${action.avatar_image}`" />
    </div>
    {{action.fullname}} {{action.relation}}

    <div class="action-btns" v-if="isRequest">
      <button @click="declineRequest" >Decline</button>
      <button @click="acceptRequest" class="action-primary">Accept</button>
    </div>

    <div class="action-btns" v-if="isMessage">
      <span class=fake-btn>&nbsp;</span>
      <button @click="messageContact" class="action-primary">Message</button>
    </div>

    
  </div>
  
</template>

<script>
import { IMAGE_BASE_URL } from '../constants'
import { PAGE, REQUEST } from "../constants"
import { updaterequest } from '../api'

export default {
  name: 'Action',
  props: {
    action: Object
  },
  data() {
    return {
      IMAGE_BASE_URL
    }
  },
  computed: {
    isRequest() {
      return this.action.relation === 'mentor request' || this.action.relation === 'accountability request'
    },
    isMessage() {
      return this.action.relation === 'mentor' || this.action.relation === 'accountability'
         || this.action.relation === 'protege'
    }
  },
  methods: {
    declineRequest() {
      updaterequest(this.action.id, REQUEST.STATUS.TERMINATED).then(response => {
        if (response.success) {
          this.$store.dispatch('getactions')
        }
      }).catch(e => {
        // TODO:
        console.log(e)
      })
    },
    acceptRequest() {
      updaterequest(this.action.id, REQUEST.STATUS.ACTIVE).then(response => {
        if (response.success) {
          this.action.relation = this.action.relation.split(' ')[0]
        }
      }).catch(e => {
        // TODO:
        console.log(e)
      })
    },
    messageContact() {
      this.$store.dispatch('messageuser', {username: this.action.username, user_id: this.action.contact})
    }
  }
}
</script>

<style>
.action-avatar-img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.action-img-container {
  float: left;
  margin-right: 1em;
}

.action {
  clear: both;
  margin-bottom: 1em;
  border: 1px solid lightgray;
  padding: 1em;
  min-height: 52px;
  border-radius: 0.4em;  
}

.action-primary {
  float: right;
}

.action-btns {
  margin-top: 1em;
}

.fake-btn {
  height: 40px;
}
</style>