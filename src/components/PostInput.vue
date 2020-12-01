<template>
  <input 
    @keypress="doSearch" 
    @keypress.enter="doPost" 
    v-model="value" 
    type="text" 
    :placeholder="placeholder"
    ref="searchinput"
  >
  <div v-if="!!searchResults.length" class="results">
    <ul>
      <li @click="mention(user)" v-for="user in searchResults" :key="user.id">
        {{user.fullname}} {{user.username}}
      </li>
    </ul>
  </div>
</template>

<script>
import { searchusers } from "../api"

export default {
  methods: {
    doSearch(e) {
      if(e.key === '@' || this.at) {
        this.at = this.at || e.target.selectionStart+1
        if (this.searchTimer) clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(() => {
          this.search = this.value.slice(this.at).split(/\s/)[0]
          searchusers(this.search).then(response => {
            if (response.success) {
              this.searchResults = response.users
            }
          })
        }, 500)
      } else {
        this.searchResults = []
      }
    },
    mention(e) {
      this.value = this.value.replace(`@${this.search}`, `@${e.username}`)
      this.searchResults = []
      this.$refs.searchinput.focus()
      const pos = this.at + e.username.length
      setTimeout(() => this.$refs.searchinput.setSelectionRange(pos, pos), 0)
      this.at = 0
      this.search = ''
    },
    doPost() {
      this.post().then(() => {
        this.value = ''
        this.searchResults = []
      })

    }
  },
  data() {
    return {
      message: "",
      value: '',
      searchTimer: null,
      searchResults: [],
      search: '',
      at: 0,
      // IMAGE_BASE_URL,
    };
  },
  props: {
    placeholder: String,
    post: Function
  }  
}
</script>

<style scoped>
  .results {
    position: absolute;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  .results li {
    border: none;
    cursor: pointer;
  }
</style>