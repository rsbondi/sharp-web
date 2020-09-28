<template>
  <div>
    <h2>Messages</h2>
    <div class="msgcontainer nobot">
      <div class="msgusers">User</div>
      <div class="messages">
        <input @keyup.enter="doMessage" v-model="message" v-if="userSelected" type="text" placeholder="Message">
      </div>
    </div>
    <div class="msgcontainer">
      <div class="msgusers">
        <ul>
          <li
            v-for="user in Object.keys(messageContent)"
            :key="user"
            @click="selectedUser(user)"
          >
          <div class="message-image">
            <img v-if="messageContent[user].avatar_image" :src="imageUrl(user)" class="message-image"/>
          </div>
          <div class="message-user" :class="selected(user)">
          {{messageContent[user].name}}
          </div>
          </li>
        </ul>
      </div>
      <div class="messages">
        <div v-if="user">
          <ul>
            <li v-for="message in user.messages" :key="message.id">
              <div class="message" :class="message.mine ? 'mine' : 'theirs'">
                {{message.content}}
              </div>
              <div class="msgtime clear" :class="message.mine ? 'mytime' : 'theirtime'">
                {{showTime(message.created_at)}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showTime } from '../util'
import { message } from "../api"
import { IMAGE_BASE_URL } from '../constants'

export default {
  name: "Messages",
  components: {},
  data() {
    return {
      user: {},
      message: ""
    };
  },
  methods: {
    selectedUser(u) {
      this.user = this.$store.state.messages.messages[u];
    },
    showTime: showTime,
    doMessage() {
      message(this.message, this.user.id).then(response => {
        console.log(response)
        this.message = ""
      }).catch(console.log)
    },
    imageUrl(id) {
      return `${IMAGE_BASE_URL}/${this.messageContent[id].avatar_image}`
    },
    selected(user) {
      return this.messageContent[user].id === this.user.id ? 'user-selected' : ''
    }

  },
  computed: {
    messageContent() {
      return this.$store.state.messages.messages;
    },
    userSelected() {
      return typeof this.user.id != 'undefined'
    }
  },
  watch() {
    messageContent: () => {};
    userSelected: console.log
  },
};
</script>

<style>
.message-image {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  float: left;
}

.message-user {
  padding-top: 0.4em;
  position: relative;
  left: 10px;
}

.user-selected {
  font-weight: bold;
}
</style>
