<template>
    <div class="reviews-container">
    <div v-if="visible" class="reviews">
      <div v-for="r in reviews" :key="r.id" class="review">
        <div class="name">{{r.fullname}}</div>
        <div class="username">{{r.username}}</div>
        <div class="review-body">{{r.review}}</div>
        <div>
          <Rating
            :rating="r.rating"
            :nratings="-1"
            :readonly="true"
          />
        </div>
      </div>
      <div class="close" @click="close">x</div>
    </div>
  </div>
</template>

<script>
import Rating from './Rating.vue'
export default {
  props: {
    reviews: Object,
    visible: Boolean,
    close: Function
  },
  components: { Rating }
}
</script>

<style scoped>
.reviews {
  position: absolute;
  width: 100%;
  padding: 1em;
  border: 3px solid cornflowerblue;
  border-radius: 0.5em;
  background-color: #fafafa;
  box-sizing: border-box;
}

.reviews-container {
  position: relative;
}

.review {
  clear: both;
  margin-top: 4em;
}

.review:first-child {
  margin-top: 0;
}

.close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}

.name {
  font-weight: 600;
  float: left;
  margin-right: 0.5em;
}
.username {
  float: left;
  font-style: italic;
  margin-right: 1em;
}
.review-body {
  padding: 1em 0;
  clear: both;  
}
</style>