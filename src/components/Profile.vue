<template>
  <div>
    <h2>Profile</h2>
    <div class="profile">
      <div class="profile-img">
        <label for="cover-input">
          <img class="cover-image" :src="coverUrl" />
        </label>
        <input id="cover-input" type="file" @change="coverChanged" />

        <div class="profile-avatar">
          <label for="avatar-input">
            <img
              :src="avatarUrl"
              class="profile-avatar-img"
            />
          </label>
          <input id="avatar-input" type="file" @change="avatarChanged" />
        </div>
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="mentor" @click="setMentor" /> Available
        to mentor
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          v-model="accountability"
          @click="setAccountability"
        />
        Available for accountability
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
import { IMAGE_BASE_URL, DEFAULT_AVATAR_URL, DEFAULT_COVER_URL } from "../constants";

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
      user: {},
    };
  },
  computed: {
    feedContent() {
      return this.$store.state.feed;
    },
    // TODO: default image
    avatarUrl() {
      return this.user.avatar_image
        ? `${IMAGE_BASE_URL}/${this.user.avatar_image}`
        : DEFAULT_AVATAR_URL
    },
    coverUrl() {
      return this.user.cover_image
        ? `${IMAGE_BASE_URL}/${this.user.cover_image}`
        : DEFAULT_COVER_URL
    },
  },
  watch() {
    feedContent: () => {};
  },
  methods: {
    avatarChanged(event) {
      this.avatarFile = event.target.files[0];
      if (this.avatarFile.type.match(/image\//)) {
        this.uploadAvatar();
      } else {
        console.error("invalid image file");
      }
    },
    uploadAvatar() {
      const formData = new FormData();
      formData.append("avatar", this.avatarFile, this.avatarFile.name);
      uploadUserImage(formData, "avatar").then(response => {
        if (response.success) {
          this.user.avatar_image = response.file
        } else (console.log)
      });
    },
    coverChanged(event) {
      this.coverFile = event.target.files[0];
      if (this.coverFile.type.match(/image\//)) {
        this.uploadCover();
      } else {
        console.error("invalid image file");
      }
    },
    uploadCover() {
      const formData = new FormData();
      formData.append("cover", this.coverFile, this.coverFile.name);
      uploadUserImage(formData, "cover").then(response => {
        if (response.success) {
          this.user.cover_image = response.file
        } else (console.log)
      });
    },
    setMentor(e) {
      offer(1, e.target.checked).then(console.log).catch(console.error);
    },
    setAccountability(e) {
      offer(0, e.target.checked).then(console.log).catch(console.error);
    },
  },
  mounted() {
    userinfo()
      .then((data) => {
        const offerings = data.info.offerings.split(",");
        this.accountability = !!~offerings.indexOf("0");
        this.mentor = !!~offerings.indexOf("1");
        this.user = data.info;
        this.$store.commit('setuser', data.info)
      })
      .catch(console.error);
  },
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
  cursor: pointer;
}

.profile {
  position: relative;
}

.profile-pic {
  position: absolute;
  top: 0;
}

.profile-avatar input[type="file"],
.profile-img input[type="file"] {
  display: none;
}

.cover-image {
  width: 800px;
  height: 400px;
}
</style>
