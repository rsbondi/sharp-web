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
import { notifications } from "../api";
import { REQUEST } from "../constants";
import Notification from './Notification'

export default {
  name: "Notifications",
  components: {Notification},
  data() {
    return {
      notifications: [],
    };
  },
  mounted() {
    notifications().then((data) => {
      if (data.success) {
        this.notifications = data.notifications;
      }
    });
  },
};
</script>

<style>
.notifications {
  width: 800px;
}

/* .notification-avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.notification-img-container {
  float: left;
  margin-right: 1em;
}

.notification {
  clear: both;
  margin-bottom: 1em;
  border: 1px solid lightgray;
  padding: 1em;
  min-height: 52px;
  border-radius: 0.4em;  
}

.notification-content {
  color: #9999aa;
}

.request-button {
  float: right;
  max-width: 100px;
} */
</style>