import { createApp, Vue } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App).use(router).use(store)
app.mount('#app')
app.directive('linkable', {
    mounted(el) {
      el.innerHTML = el.innerHTML
        .replace(/(https:\/\/[^(\s|$)]+)/g, link => {
          if (link.length > 17) {
            return `<a href="${link}" title="${link}">${link.slice(0,15)}...</a>`
          } else {
            return `<a href="${link}" title="${link}">${link}</a>`
          }
        })
    }
  })
