<template>
  <div>
    <h2>Messages</h2>
    <div class="msgcontainer nobot">
      <div class="msgusers">
        <span>Chats</span>
        <div class="search-users-btn" v-show="mode==='chat'">
          <button @click="searchMode" ><SearchIcon/></button>
        </div>
      </div>
      <div class="messages">
        <input @keyup.enter="doMessage" v-model="message" v-if="mode==='chat'" type="text" placeholder="Message">
        <input @keyup="doSearch" v-model="search" v-if="mode==='search'" type="text" placeholder="Type name of person">
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
        <div class="search-results" v-if="mode==='search' && searchReults.length">
          <ul>
            <li v-for="user in searchReults" :key="user.id">
              <div @click="selectFromSearch(user)" class="user-search-result">
                <div class="message-image">
                  <img v-if="user.avatar_image" :src="`${IMAGE_BASE_URL}/${user.avatar_image}`" class="message-image"/>
                </div>
                {{user.fullname}} <span class="msg-username">{{user.username}}</span>
              </div>
            </li>
          </ul>

        </div>
        <div v-if="mode==='chat'">
          <ul>
            <li v-for="message in user.messages" :key="message.id">
              <div class="message" :class="message.mine ? 'mine' : 'theirs'" v-linkable>
                {{message.content}}
              </div>
              <div class="msgtime clear" :class="message.mine ? 'mytime' : 'theirtime'">
                <Time :created_at="message.created_at"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { message, searchusers } from "../api"
import { IMAGE_BASE_URL } from '../constants'
import Time from './Time.vue'
import SearchIcon from './icons/SearchIcon'

export default {
  name: "Messages",
  components: {Time, SearchIcon},
  data() {
    return {
      message: "",
      search: '',
      searchTimer: null,
      searchReults: [],
      IMAGE_BASE_URL
    };
  },
  methods: {
    selectedUser(u) {
      const user = this.$store.state.messages[u];
      user.username = u
      this.$store.commit('setmessageuser', user)
      this.$store.commit('setcontent', {key:'messageMode', data: 'chat'})
      this.message = ''
    },
    doMessage() {
      message(this.message, this.user.id).then(response => {
        if (response.success) {
          this.$store.commit('addmessage', {
            username: this.user.username, 
            message_id: response.message.id, 
            content: response.message.content,
            mine: 1,
            created_at: response.message.created_at})
          this.message = ""

        }
      }).catch(console.log)
    },
    imageUrl(id) {
      return `${IMAGE_BASE_URL}/${this.messageContent[id].avatar_image}`
    },
    selected(user) {
      return this.messageContent[user].id === this.user.id ? 'user-selected' : ''
    },
    searchMode() {
      this.$store.commit('setcontent', {key:'messageMode', data: 'search'})
    },
    doSearch() {
      if(this.search.length > 1) {
        // TODO: composition api for debounce
        if (this.searchTimer) clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(() => {
          searchusers(this.search).then(response => {
            if (response.success) {
              this.searchReults = response.users
            }
          })
        }, 500)
      } else {
        this.searchReults = []
      }
    },
    selectFromSearch(user) {
      this.$store.commit('addmessageuser', user)
      this.$store.commit('setcontent', {key:'messageMode', data: 'chat'})
      this.$store.commit('setmessageuser', user)
      this.searchReults = []
      this.search = ''
    }

  },
  computed: {
    messageContent() {
      return this.$store.state.messages;
    },
    userSelected() {
      return typeof this.user.id != 'undefined'
    },
    user() {
      return this.$store.state.messageTo
    },
    mode() {
      return this.$store.state.messageMode
    }
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

.search-users-btn {
  float: right;
}

.search-results {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0 1em;
}
.msg-username {
  font-style: italic;
  color: gray;
}

.user-search-result {
  height: 50px;
  clear: both;
  cursor: pointer;
}
</style>
