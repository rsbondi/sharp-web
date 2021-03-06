<template>
  <div class="body-component">
    <h2>Profile</h2>
    <div class="profile">
      <div class="profile-edit" v-if="showEdit">
        <ProfileEdit 
        :user="user"
        :close="closeEdit"
         />
      </div>
      <div class="profile-img">
        <label for="cover-input">
          <img class="cover-image" :src="coverUrl"  :class="okclick" />
        </label>
        <input id="cover-input" type="file" @change="coverChanged" />

        <div class="avatar-container">
          <div class="profile-avatar" :class="okclick">
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
    </div>

    <div class="edit-icon" v-if="!~$store.state.profileUser">
      <PencilIcon @click="showEdit=!showEdit"/>
    </div>

    <div class="offer" :class="!~$store.state.profileUser ? 'offering' : ''">
      <label>
        <input 
          type="checkbox" 
          @click="setMentor"
          v-model="mentor" 
          :disabled="~$store.state.profileUser" /> Available
        to mentor
      </label>
    </div>
    <div :class="!~$store.state.profileUser ? 'offering' : ''">
      <label>
        <input
          type="checkbox"
          v-model="accountability"
          @click="setAccountability"
          :disabled="~$store.state.profileUser"
        />
        Available for accountability
      </label>
    </div>

    <div class="info-wrapper">
      <UserInfo :user="user" />
    </div>

    <div class="flex-container rating" v-if="mentor || user.mymentor">
      <div title="Mentor Rating">
        <Rating 
          :id="user.id"
          :rating="user.rating" 
          :nratings="user.nratings"
          :reviews="user.reviews"
          :type="1"
          :readonly="!user.mymentor"
          :updateRating="rated"
        />

        <div class="reviews-link" v-if="user.reviews">
          <a @click.prevent="showReviews" href="">reviews</a>
        </div>
      </div>
    </div>

    <Reviews 
      :reviews="reviewItems" 
      :visible="reviewsVisible"
      :close="() => reviewsVisible=false"
    />

    <div>
      <ul>
        <li v-for="post in feedContent" :key="post.id">
          <FeedItem :post="post" />
        </li>
      </ul>
    </div>
  </div>


</template>

<script>
import FeedItem from "./FeedItem";
import UserInfo from "./UserInfo";
import Rating from './Rating.vue'
import Reviews from './Reviews.vue'
import ProfileEdit from './ProfileEdit.vue'
import PencilIcon from './icons/PencilIcon.vue'
import { post, uploadUserImage, offer, userinfo, reviews } from "../api";
import { IMAGE_BASE_URL, DEFAULT_AVATAR_URL, DEFAULT_COVER_URL } from "../constants";

export default {
  name: "Profile",
  components: {
    FeedItem, UserInfo, Rating, Reviews, PencilIcon, ProfileEdit
  },
  data() {
    return {
      postContent: "",
      avatarFile: "",
      coverFile: "",
      mentor: false,
      accountability: false,
      user: {},
      reviewsVisible: false,
      reviewItems: [],
      showEdit: false
    };
  },
  computed: {
    feedContent() {
      return this.$store.state.posts;
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
    profileUser() {
      return this.$store.state.profileUser
    },
    okclick() {
      return ~this.$store.state.profileUser ? 'nope' : ''
    }
  },
  watch: {
    feedContent() {},

    profileUser() { this.getProfile() } 

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
          this.$store.commit('setcontent', {key: 'avatar_image', data: response.file})
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
    getProfile() {
      const user_id = this.$store.state.profileUser === -1 ? null : this.$store.state.profileUser
      userinfo(user_id)
        .then((data) => {
          const offerings = data.info.offerings.split(",");
          this.accountability = !!~offerings.indexOf("0");
          this.mentor = !!~offerings.indexOf("1");
          this.user = data.info;
          this.$store.commit('setuser', data.info)
      })
      .catch(console.error);
    },
    showReviews() {
      if (!this.reviewsVisible) {
        reviews(this.user.id, 1).then(result => {
          this.reviewsVisible = true
          this.reviewItems = result.reviews
        })
      } else this.reviewsVisible = false
    },
    closeEdit(update) {
      if (update) {
        userinfo().then(result => {
          this.user = result.info;
          this.showEdit = false
        }).catch(consle.log)
      } else this.showEdit = false
    },
    rated(rating, nratings, reviews) {
      this.user.rating = rating
      this.user.nratings = nratings
      this.user.reviews = reviews

    }
  },
  mounted() {
    this.getProfile()
},
  
};
</script>

<style scoped>
.profile-avatar {
  bottom: -50px;
  position: absolute;
  border: 2px solid lightgray;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  /* left: 350px;
  display: flex; */
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
  width: 100%;
  height: 400px;
  cursor: pointer;
  max-width: 100%;
  margin: auto;
}

@media (min-width: 1007px) {
  .cover-image {
    width: 800px
  }
}

.nope {
  pointer-events: none;
}

.profile-info {
  margin-top: 20px;
}

.info-wrapper {
  margin-top: 16px;
  text-align: center;
}

.rating {
  margin-top: 1em;
}

.offering>label, .offering>label>input[type="checkbox"] {
  cursor: pointer;
}

.offer {
  margin-top: 60px;
}

@media (min-width: 1007px) {
  .offer {
    margin-top: 5px;
  }
}

.reviews-link {
  text-align: center;
}

.edit-icon {
  float: right;
  margin-top: 10px;
  cursor: pointer;
}

.profile-edit {
  position: absolute;
  width: 100%;
  z-index: 20;
  padding: 1em;
  border: 3px solid cornflowerblue;
  border-radius: 0.5em;
  background-color: #fafafa;
  box-sizing: border-box;
}

.avatar-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
