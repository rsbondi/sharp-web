import { createApp, Vue } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App).use(router).use(store)
app.mount('#app')
app.directive('linkable', {
    mounted(el) {
      const children = el.childNodes
      const linkExpression = /(https:\/\/[^(\s|$)]+)/g
      for (var c=0; c<children.length; c++) {
        const child = children[c]
        if (child.nodeName === '#text') {
          const parts = child.textContent.split(linkExpression)
          if (parts.length > 1) {
            const parent = child.parentElement
            const frag = document.createDocumentFragment()
            parts.forEach(part => {
              if (part.match(linkExpression)) {
                const a = document.createElement('a')
                a.href = part
                a.textContent = part.length > 17 ? `${part.slice(0, 15)}...` : part
                frag.appendChild(a)
              } else {
                const txt = document.createElement('text')
                txt.textContent = part
                frag.appendChild(txt)
              }
            })
            parent.innerHTML = ''
            parent.appendChild(frag)
          }
         }
      }
    }
  })
