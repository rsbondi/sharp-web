import { createRouter, createWebHistory } from 'vue-router'
import Feed from "../components/Feed.vue";
import Messages from "../components/Messages.vue";
import Profile from "../components/Profile.vue"
import People from "../components/People"
import Notifications from "../components/Notifications.vue";
import Post from "../components/Post.vue";
import Follows from "../components/Follows.vue"
import Program from "../components/Program.vue"

const routes = [
  {
    path: '/',
    component: Feed
  },
  {
    path: '/messages',
    component: Messages
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/people',
    component: People
  },
  {
    path: '/notifications',
    component: Notifications
  },
  {
    path: '/post',
    component: Post
  },
  {
    path: '/follows',
    component: Follows
  },
  {
    path: '/program',
    component: Program
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
