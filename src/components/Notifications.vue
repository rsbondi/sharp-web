<template>
  <div class="notifications">
    <h2>Notifications</h2>

    <ul>
      <li v-for="n in notifications" :key="n.id">
        <div class="notification">
          <div class="notification-img-container" v-if="n.avatar_image">
            <img class="notification-avatar-img" :src="`${IMAGE_BASE_URL}/${n.avatar_image}`" />
          </div>
          {{n.fullname}}&nbsp;
          <!-- <em>{{n.username}}</em> -->
          {{notificationText(n)}}
          <div>{{showTime(n.created_at)}}</div>
          <div v-if="n.notification_type!='request'">
            <div class="notification-content">{{n.content}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { showTime } from "../util";
import { notifications } from "../api";
import { IMAGE_BASE_URL } from "../constants";
export default {
  name: "Notifications",
  data() {
    return {
      notifications: [],
      IMAGE_BASE_URL,
    };
  },
  methods: {
    showTime: showTime,
    notificationText(n) {
      switch (n.notification_type) {
        case "message":
          return "sent you a new message";
        case "request":
          return (
            "requested " +
            (n.content === "accountability"
              ? "an accountability partnership"
              : "a mentorship")
          );
      }
    },
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

.notification-avatar-img {
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
</style>