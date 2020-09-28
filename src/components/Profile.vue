<template>
  <div>
    <h2>Profile</h2>
    <div class="profile">
      <div class="profile-img">
        <label for="cover-input">
          <img src="https://via.placeholder.com/800x400" />
        </label>
        <input id="cover-input" type="file" @change="coverChanged" />

        <div class="profile-avatar">
          <label for="avatar-input">
            <img
              src="https://res.cloudinary.com/dj92lnawi/image/upload/v1598407927/user/eddc6e99-61b5-4c07-82c5-76739fc0721d.png"
              class="profile-avatar-img"
            />
          </label>
          <input id="avatar-input" type="file" @change="avatarChanged" />
        </div>
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="mentor" @click="setMentor"/> Available to mentor
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="accountability" @click="setAccountability" /> Available for accountability
      </label>
    </div>

    <div class="feed">
      <ul>
        <li v-for="post in feedContent.posts" :key="post.id">
          <FeedItem :post="post" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FeedItem from "./FeedItem";
import { post, uploadUserImage, offer, userinfo } from "../api";

export default {
  name: "Profile",
  components: {
    FeedItem,
  },
  data() {
    return {
      postContent: "",
      avatarFile: "",
      coverFile: "",
      mentor: false,
      accountability: false,
    };
  },
  computed: {
    feedContent() {
      return this.$store.state.feed;
    },
  },
  watch() {
    feedContent: () => {};
  },
  methods: {
    avatarChanged(event) {
      this.avatarFile = event.target.files[0];
      if (this.avatarFile.type.match(/image\//)) {
        this.uploadAvatar()
      } else {
        console.error('invalid image file')
      }
    },
    uploadAvatar() {
      const formData = new FormData();
      formData.append("avatar", this.avatarFile, this.avatarFile.name);
      uploadUserImage(formData, 'avatar').then(console.log);
    },
    coverChanged(event) {
      this.coverFile = event.target.files[0];
      if (this.coverFile.type.match(/image\//)) {
        this.uploadCover()
      } else {
        console.error('invalid image file')
      }
    },
    uploadCover() {
      const formData = new FormData();
      formData.append("cover", this.coverFile, this.coverFile.name);
      uploadUserImage(formData, 'cover').then(console.log);
    },
    setMentor(e) {
      offer(1, e.target.checked).then(console.log).catch(console.error)
    },
    setAccountability(e) {
      offer(0, e.target.checked).then(console.log).catch(console.error)
    },
  },
  mounted() {
    userinfo().then(data => {
      const offerings = data.info.offerings.split(',')
      this.accountability = !!~offerings.indexOf("0")
      this.mentor = !!~offerings.indexOf("1")
      document.title = data.info.fullname
    }).catch(console.error)
  }
};
</script>

<style>
.profile-avatar {
  bottom: -50px;
  position: absolute;
  border: 2px solid lightgray;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  left: 350px;
  display: flex;
  overflow: hidden;
  padding: 0;
}

.profile-img {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

.profile-avatar-img {
  height: 100px;
  width: 100px;
  cursor:pointer;
}

.profile {
  position: relative;
}

.profile-pic {
  position: absolute;
  top: 0;
}

.profile-avatar input[type="file"], .profile-img input[type="file"] {
  display: none;
}
</style>
