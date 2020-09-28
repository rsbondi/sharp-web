<template>
  <div class="hello">
    <div class="container">
      <label>Post</label>
      <input type="checkbox" v-model="post" />
      <label class>Command</label>
      <input v-model="command" />
      <label class="clear">Macaroon</label>
      <input class="mac" v-model="macaroon" />

      <button @click="send">Send</button>
      <label class="clear">Params</label>
      <textarea v-model="params"></textarea>
      <label class="clear">Results</label>
      <textarea v-model="results"></textarea>
    </div>
    <div>MDAyNGxvY2F0aW9uIGh0dHA6Ly93d3cuZXhhbXBsZS5vcmcKMDAxN2lkZW50aWZpZXIgcnNib25kaQowMDBmY2lkIGlkID0gMQowMDI4Y2lkIHRpbWUgPCAyMDIxLTA5LTAzVDE4OjIzOjM2LjE0OVoKMDAyZnNpZ25hdHVyZSCnpmlGPTLR-kGlKfv_9YP1JlhR92xYStzybT5wmPUlkwo</div>
    <div>MDAyNGxvY2F0aW9uIGh0dHA6Ly93d3cuZXhhbXBsZS5vcmcKMDAxNGlkZW50aWZpZXIgZnJlZAowMDEwY2lkIGlkID0gMTEKMDAyOGNpZCB0aW1lIDwgMjAyMS0wOS0wNFQwMDoyMzoyMS40MTZaCjAwMmZzaWduYXR1cmUgww4EVHtA95HEvsXVZ7wPURnsWnOpwQuGioOgySIAIQsK</div>
  </div>
</template>

<script>
import {postApi, login, newuser, newgroup, joingroup, post,
        message, comment, follow, messages, feed, groupusers,
        usersgroups, like, likes, offer, request, updaterequest} from '../api'

export default {
  name: "ApiTest",
  data() {
    return {
      command: "",
      params: "",
      results: "",
      macaroon: "",
      post: true,
    };
  },
  methods: {
    send() {
      window.macaroon = this.macaroon
      const params = this.params ? JSON.parse(this.params) : {}
      switch(this.command) {
        case 'login':
          login(params.username, params.password).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'newuser':
          newuser(params.username, params.password).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'newgroup':
          newgroup(params.name, params.description).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'joingroup':
          joingroup(params.group_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'post':
          post(params.content, params.group_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'message':
          message(params.content, params.recipient_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'comment':
          comment(params.content, params.post_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'follow':
          follow(params.followee_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'messages':
          messages().then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'feed':
          feed(params.group_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'groupusers':
          groupusers(params.group_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'usersgroups':
          usersgroups(params.group_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'like':
          like(params.item_id, params.item_type).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'likes':
          likes(params.item_id, params.item_type).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'offer':
          offer(params.offer_type).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'request':
          request(params.request_type, params.requestee_id).then(data => {
            this.results = JSON.stringify(data)
          })
          break
        case 'updaterequest':
          updaterequest(params.request_id, params.request_status).then(data => {
            this.results = JSON.stringify(data)
          })
          break
      }
    }
  }
}
</script>

<style scoped>
label {
  float: left;
  width: 100px;
  text-align: left;
}

input,
textarea {
  float: left;
}

textarea {
  width: 400px;
  height: 400px;
}

.clear {
  clear: both;
}

.container {
  width: 560px;
  margin: auto;
}

.mac {
  width: 400px;
}
</style>

