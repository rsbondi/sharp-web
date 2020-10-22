<template>
    <div class="reviews-container">
    <div v-if="visible" class="reviews">
      <div v-for="r in reviews" :key="r.id">
        {{r.fullname}} {{r.rating}} {{r.review}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Object,
    visible: Boolean
  }
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

</style>