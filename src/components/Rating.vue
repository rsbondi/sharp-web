<template>
  <div>
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
    <div class="star ratings">({{nratings}})</div>
  </div>
</template>

<script>
import Star from './icons/Star.vue'
import StarHalf from './icons/StarHalf.vue'
export default {
  components: { Star, StarHalf },
  props: {
    rating: Number,
    nratings: Number,
    type: Number
  },
  methods: {
    rateit(n) {
      console.log('rateit', n)
    }
  }
}
</script>

<style scoped>
  .star {
    float: left;
    cursor: pointer;
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
</style>