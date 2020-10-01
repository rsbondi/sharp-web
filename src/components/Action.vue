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
import { PAGE } from "../constants"

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
         || this.action.relation === 'protoge'
    }
  },
  methods: {
    declineRequest() {
      console.log(this.action)
    },
    acceptRequest() {
      console.log(this.action)
    },
    messageContact() {
      this.$store.dispatch('setpage', PAGE.MESSAGES)
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