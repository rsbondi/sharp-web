<template>
  <div class="accept">
    <slot></slot>
    <button @click="accept()" class="btn-accept">Accept</button>
    <button @click="reject()" class="btn-reject">Cancel</button>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
    },
  }
}
</script>

<style scoped>
  .btn-accept {
    float: right;
  }

  .btn-reject {
    background-color: gray;
    color: white;
    float: left;
  }

  .person .flex-container div.accept {
    width: 400px;
    border: 1px solid lightgray;
    padding: 1em;
    padding-bottom: 2em;
    margin-top: 0.5em;
    position: absolute;
    background: lightgoldenrodyellow;
    z-index: 11;
  }
</style>