<template>
  <div class="accept">
    <p>
      Accountability partnering is an important element to your success.
      By parnering with another, you are making a commitment to provide mutual support.
      You agree to be a good listener and support whatever issues are presented.
      Also you will be seeking support with your issues.
      Try to avoid giving unsolicited advice.
      These are suggested guidelines, but you are free to interact in any way as long
      as in agreement with your partner.  We wish you success in partnering.
    </p>

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