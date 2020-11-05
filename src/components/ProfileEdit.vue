<template>
<div class="edit-container">
  <div>
    <label for="">Name</label>
    <input type="text" v-model="fullname">
  </div>
  <div class="form-item">
    <label for="">Email</label>
    <input type="text" v-model="email">
  </div>
  <div class="form-item">
    <label for="">Bio</label>
    <textarea v-model="bio"></textarea>
  </div>
  <button @click="updateProfile" class="update-button">Update</button>
   <div class="close" @click="cancel">x</div>
</div>
</template>

<script>
import { updateuser } from '../api'
export default {
  props: {
    user: Object,
    close: Function
  },
  data() {
    return {
      fullname: this.user.fullname,
      email: this.user.email,
      bio: this.user.bio
    }
  },
  methods: {
    updateProfile() {
      updateuser(this.fullname, this.email || "", this.bio || "").then(response => {
        if (response.success) {
          this.close(true)
        }
      })
    },
    cancel() {
      this.fullname = this.user.fullname,
      this.email = this.user.email,
      this.bio = this.user.bio
      this.close()
    }
  }
}
</script>

<style scoped>
.edit-container {
  position: relative;
}

textarea {
  width: 100%;
  height: 200px;
}

.form-item {
  margin-top: 1em;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: -8px;
}

.update-button {
  float: right;
  margin-top: 2em;
}
</style>