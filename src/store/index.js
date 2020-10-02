import { createStore } from 'vuex'
import { PAGE } from '../constants'
import {postApi, login, newuser, newgroup, joingroup, post,
  message, comment, follow, messages, feed, groupusers,
  usersgroups, like, likes, offer, request, updaterequest} from '../api'
import { toISO8601String } from '../util'
const pages = ["Feed", "Messages", "Notifications", "Profile", "Groups", "People", "Program"] // TODO: sloppy
export default createStore({
  state: {
    currentPage: 0,
    content: {},
    feed: {posts: []},
    messages: {messages: []},
    currentComponent: "Feed",
    auth: false, // this is for ui, actual requires macaroon
    user: {}
  },
  mutations: {
    setpage(state, payload) {
      state.currentPage = payload
      state.currentComponent = pages[payload]
    },
    setcontent(state, payload) {
      state[payload.key] = payload.data
    },
    setauth(state, payload) {
      state.auth = payload
    },
    setuser(state, payload) {
      state.user = payload
    },
    addmessageuser(state, payload) {
      if (!(payload.username in state.messages.messages)) {
        state.messages.messages[payload.username] = {...payload, name: payload.fullname, messages: []}
      }
    },
    addmessage(state, payload) {
      const { content, message_id, mine, created_at } = payload
      const newState = {...state.messages.messages}
      newState[payload.username].messages
        .unshift({content, message_id, mine, created_at})
      console.log('message added', newState)
      state.messages.messages = newState
    }
  },
  actions: {
    async setpage (context, payload) {
      let data
      switch (payload) {
        case PAGE.FEED:
        case PAGE.PROFILE:
          await updateFeed(context)
          break;
        case PAGE.MESSAGES:
          data = await messages()
          context.commit('setcontent', {key:'messages', data})
          break;
        case PAGE.NOTIFICATIONS:
          break;
      }
      context.commit('setpage', payload)
    },
    async getfeed(context, payload) {
      await updateFeed(context)
    }
  },
  modules: {
  }
})

async function updateFeed(context) {
  const data = await feed(context.state.feed.posts.last)
  if (data.posts.length) {
    const posts = [...context.state.feed.posts]
    posts.unshift(...data.posts)
    posts.last = toISO8601String(new Date())
    context.commit('setcontent', {key:'feed', data: {posts}})
  }

}
