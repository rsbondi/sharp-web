<template>
  <div class="stars" :class="readonly ? 'readonly' : ''">
    <div 
      class="star" 
      :class="rating > 0 ? 'full' : 'empty'"
      @click="rateit(1)"
      >
      <Star v-if="rating ===0 || rating > 0.5"/>
      <StarHalf v-if="rating > 0 && rating <= 0.5" />
    </div>
    <div 
      class="star" 
      :class="rating > 1 ? 'full' : 'empty'"
      @click="rateit(2)"
      >
      <Star v-if="rating <=1 || rating > 1.5"/>
      <StarHalf v-if="rating > 1 && rating <= 1.5" />
    </div>
    <div 
      class="star" 
      :class="rating > 2 ? 'full' : 'empty'"
      @click="rateit(3)"
      >
      <Star v-if="rating <=2 || rating > 2.5"/>
      <StarHalf v-if="rating > 2 && rating <= 2.5" />
    </div>
    <div 
      class="star" 
      :class="rating > 3 ? 'full' : 'empty'"
      @click="rateit(4)"
      >
      <Star v-if="rating <=3 || rating > 3.5"/>
      <StarHalf v-if="rating > 3 && rating <= 3.5" />
    </div>
    <div 
      class="star" 
      :class="rating > 4 ? 'full' : 'empty'"
      @click="rateit(5)"
      >
      <Star v-if="rating <=4 || rating > 4.5"/>
      <StarHalf v-if="rating > 4 && rating <= 4.5" />
    </div>
    <div v-if="~nratings" class="star ratings">({{nratings}})</div>

    <div class="review" v-if="showreview">
      <div class="review-header">
        <h5>Write a review</h5>
      </div>
      <div class="review-body">
        <textarea v-model="myreview"></textarea>
        <div class="btns">
          <button @click="showreview=false">Cancel</button>
          <button @click="submitReview">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from './icons/Star.vue'
import StarHalf from './icons/StarHalf.vue'
import { rate } from '../api'
export default {
  components: { Star, StarHalf },
  props: {
    rating: Number,
    nratings: Number,
    reviews: Number,
    type: Number,
    id: Number,
    readonly: Boolean,
    updateRating: Function,
  },
  data() {
    return {
      myrating: 0,
      showreview: false,
      myreview: '',
    }
  },
  methods: {
    rateit(n) {
      this.myrating = n
      this.showreview = true
    },
    submitReview() {
      rate({item_id: this.id, item_type: this.type, rating: this.myrating, review: this.myreview})
        .then(result => {
          if (result.success) {
            if (result.stats && this.updateRating) {
              const { rating, nratings, reviews } = result.stats
              this.updateRating(rating, nratings, reviews)
            }
            this.showreview = false
          }
        }).catch(console.log)
    }
  }
}
</script>

<style scoped>
  .star {
    float: left;
    cursor: pointer;
  }
  .readonly {
    cursor: none;
    pointer-events: none;
  }
  .empty {
    fill: none;
  }
  .full {
    fill: gold;
  }
  .ratings {
    padding-top: 0.2em;
    padding-left: 0.5em;
  }
  .stars {
    position: relative;
    overflow: visible;
  }
  .review {
    position: absolute;
    background: rgba(150,150,150,0.2);
    border: 1px solid lightgray;
    border-radius: 3%;
    top: 6px;
    left: -10px;
  box-shadow: 0.2em 0.2em 0.2em rgba(0, 0, 0, 0.2);
  }
  textarea {
    width: 300px;
    height: 120px;
  }
  .review-header {
    padding: 0.5em;
    padding-bottom: 0;
  }
  .review-body {
    background: white;
    padding: 0.5em;
  }
  .btns {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  .btns>button:last-child {
    float: right;
  }
  h5 {
    margin-bottom: 0.5em;
    margin-top: 2em;  
  }

</style>