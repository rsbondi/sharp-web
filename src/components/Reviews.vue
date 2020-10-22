<template>
    <div class="reviews-container">
    <div v-if="visible" class="reviews">
      <div v-for="r in reviews" :key="r.id" class="review">
        {{r.fullname}} {{r.rating}} {{r.review}}
        <div>
          <Rating
            :rating="r.rating"
            :nratings="-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from './Rating.vue'
export default {
  props: {
    reviews: Object,
    visible: Boolean
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
  border-radius: 5%;
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

</style>