<template>
  <div class="program-item">
    <div class="phase">
      <div class="flex-container">
        <div class="info">{{ program.name }}</div>
        <div class="info">Level: {{ program.level }}</div>
        <div class="info">Members: {{ program.members }}</div>
        <div class="info mystatus">
          <a @click.prevent="setProgram" href="">{{ mine }}</a>
          <button @click="joinProgram" v-if="!mine">Join</button>
        </div>
      </div>
      <div class="desc">{{ program.description }}</div>
      <div v-for="phase in program.phases" :key="phase.id">
        <div class="flex-container">
          <div class="info">{{ phase.name }}</div>
          <div class="info">Level: {{ phase.level }}</div>
          <div class="info">&nbsp;</div>
          <div class="info">&nbsp;</div>
        </div>
        <div class="desc">{{ phase.description }}</div>
      </div>
      <div class="flex-container">
        <div class="about">
          <strong>Created by</strong><br>
          <div class="prg-img-container" v-if="program.avatar_image">
            <img
              class="prg-avatar-img"
              :src="`${IMAGE_BASE_URL}/${program.avatar_image}`"
            />
          </div>
          <div class="userinfo">
            {{ program.fullname }} 
            <ProfileLink :user="program" />
            <button v-if="!program.creator" @click="messageContact" class="action-primary">Message</button>

          </div>
          <div style="clear:both"></div>
        </div>
        <div class="about">
          <strong>Rating</strong><br>
          <div class="stars">
            <Rating 
              :id="program.id"
              :rating="program.rating" 
              :nratings="program.nratings"
              :type="0"
              :readonly="!mine"
            />


          </div>
            <div class="reviews-link" v-if="program.reviews">
              <a @click.prevent="showReviews" href="">reviews</a>
            </div>
        </div>
      </div>
          <Reviews 
            :reviews="reviewItems" 
            :visible="reviewsVisible"
            :close="() => reviewsVisible=false"
            />
    </div>
  </div>
</template>

<script>
import { participate, reviews } from "../api";
import ProfileLink from "./ProfileLink.vue";
import Rating from './Rating.vue'
import Reviews from './Reviews.vue'
import { IMAGE_BASE_URL } from "../constants";

export default {
  props: {
    program: Object,
  },
  components: { ProfileLink, Rating, Reviews },
  methods: {
    joinProgram() {
      participate(this.program.id).then((result) => {
        console.log(result);
        this.program.member = 1;
        this.program.members++;
      });
    },
    messageContact() {
      this.$store.dispatch('messageuser', {username: this.program.username, user_id: this.program.user_id})
    },
    setProgram() {
      this.$store.commit('setcontent', {key: 'currentProgram', data: this.program})
      this.$store.commit('setcontent', {key: 'programView', data: 'feed'})
    },
    showReviews() {
      if (!this.reviewsVisible) {
        reviews(this.program.id, 0).then(result => {
          this.reviewsVisible = true
          this.reviewItems = result.reviews
        })
      } else this.reviewsVisible = false
    }

  },
  data() {
    return {
      IMAGE_BASE_URL: IMAGE_BASE_URL,
      reviewsVisible: false,
      reviewItems: []

    };
  },
  computed: {
    mine() {
      if (this.program.creator) return "you created";
      if (this.program.member) return "you joined";
      return "";
    },
  },
};
</script>

<style scoped>
.phase {
  margin-top: 2em;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0.5em 0.5em 0.5em rgba(0, 0, 0, 0.2);
}
.desc {
  padding: 1em;
}
.info {
  width: 25%;
  padding: 1em;
}
.info:first-child {
  font-weight: 600;
}
.mystatus {
  font-style: italic;
  color: lightslategray;
}

.prg-avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.prg-img-container {
  float: left;
  margin-right: 1em;
  margin-top: 0.5em;
}

.about {
  width: 50%;
  padding: 1em;
}
.userinfo {
  padding-top: 18px;
}
.stars {
  padding-top: 8px;
}
.reviews-link {
  text-align: center;
}
</style>