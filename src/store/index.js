import { createStore } from 'vuex'
import { PAGE, PAGE_COMPONENTS } from '../constants'
import {messages, feed, actions, user, notifications,
  getcomment, userposts, newnotifications, seeall} from '../api'
import { toISO8601String } from '../util'
import router from '../router'
export default createStore({
  state: {
    currentPage: 0,
    content: {},
    feed: {posts: []},
    posts: [],
    messages: [],
    notifications: [],
    currentComponent: "Feed",
    auth: false, // this is for ui, actual requires macaroon
    user: {},
    actions: [],
    messageTo: {},
    messageMode: 'search',
    activePost: -1,
    activeComment: -1,
    profileUser: -1,
    avatar_image: '',
    currentUser: -1,
    currentList: '',
    unseen: 0,
  },
  mutations: {
    setpage(state, payload) {
      state.currentPage = payload
      state.currentComponent = PAGE_COMPONENTS[payload]
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
      if (!(payload.username in state.messages)) {
        const newState = {...state.messages}
        newState[payload.username] = {...payload, name: payload.fullname, messages: payload.messages || []}
        state.messages = newState
      }
    },
    addmessage(state, payload) {
      const { content, message_id, mine, created_at } = payload
      const newState = {...state.messages}
      newState[payload.username].messages
        .unshift({content, message_id, mine, created_at})
      state.messages = newState
    },
    getactions(state, payload) {
      state.actions = payload
    },
    setmessageuser(state, payload) {
      if (payload.username in state.messages) {
        state.messageTo = state.messages[payload.username]
      } else state.messageTo = payload
    } 
  },
  actions: {
    async setpage (context, payload) {
      let data
      switch (payload) {
        case PAGE.FEED:
          await updateFeed(context)
          break;
        case PAGE.PROFILE:
          await updateFeed(context, true)
          break;
        case PAGE.MESSAGES:
          if (context.state.messages) data = await messages()
          context.commit('setcontent', {key:'messages', data: data.messages})
          break;
        case PAGE.NOTIFICATIONS:
          notifications().then((data) => {
            if (data.success) {
              context.state.notifications = data.notifications;
              context.dispatch('seeall')
            }
          }).catch(console.error);
      
          break;
      }
      context.commit('setpage', payload)
    },
    async getfeed(context, payload) {
      await updateFeed(context)
    },
    newnotifications(context) {
      newnotifications().then(result => {
        if (result.success) {
          context.state.unseen = result.unseen
        }
      })
    },
    seeall(context) {
      seeall().then(result => {
        if (result.success) {
          context.state.unseen = 0
        }
      })
    },
    getactions(context, payload) {
      actions().then(response => {
        context.commit('getactions', response.actions)
      })
    },
    async messageuser(context, payload) {
      try {
        context.commit('setcontent', {key:'messages', data: {messages: null}})
        await router.push('messages')
        const data = await messages()
        context.commit('setcontent', {key:'messages', data: data.messages})
        const userResponse = await user(payload.user_id)
        context.commit('addmessageuser', userResponse.user)
        const selectedUser = context.state.messages[payload.username]
        selectedUser.username = payload.username
        context.commit('setcontent', {key:'messageMode', data:'chat'})
        context.commit('setmessageuser', selectedUser)
      } catch(e) {console.log(e)}
    },
    async setactivepost(context, payload) {
      try {
        if (payload.comment_id) {
          context.commit('setcontent', {key:'activeComment', data: payload.comment_id})
          const comment = await getcomment(payload.comment_id)
          context.commit('setcontent', {key:'activePost', data: comment.comment.post_id})
        } else {
          context.commit('setcontent', {key:'activePost', data: payload.post_id})
        }
        context.commit('setpage', PAGE.POST)
      } catch(e) {console.log(e)}
    }
  },
  modules: {
  }
})

async function updateFeed(context, user_posts) {
  let data
  if (user_posts) {
    const user_id = ~context.state.profileUser ? context.state.profileUser : null
    data = await userposts(user_id)
    context.commit('setcontent', {key:'posts', data: data.posts})
  } else {
    data = await feed(context.state.feed.posts.last)
    if (data.posts.length) {
      const posts = [...context.state.feed.posts]
      posts.unshift(...data.posts)
      posts.last = toISO8601String(new Date())
      context.commit('setcontent', {key:'feed', data: {posts}})
    }
  }

}
