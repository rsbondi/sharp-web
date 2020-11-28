<template>
  <div class="notifications">
    <h2>Notifications</h2>

    <ul>
      <li v-for="n in notifications" :key="n.id">
        <Notification :notification="n"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { notifications, seeall } from "../api";
import { REQUEST } from "../constants";
import Notification from './Notification'

export default {
  name: "Notifications",
  components: {Notification},
  computed: {
    notifications() {
      return this.$store.state.notifications
    }
  },

};
</script>
