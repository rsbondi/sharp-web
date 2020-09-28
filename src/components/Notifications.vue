<template>
  <div class="notifications">
    <h2>Notifications</h2>

    <ul>
      <li v-for="n in notifications" :key="n.id">
        <div class="notification" @click="handleNotificationClick(n)">
          <div class="notification-img-container" v-if="n.avatar_image">
            <img class="notification-avatar-img" :src="`${IMAGE_BASE_URL}/${n.avatar_image}`" />
          </div>
          {{n.fullname}}&nbsp;
          {{notificationText(n)}}
          <button class="request-button" v-if="enableAcceptButton(n)" @click="handleAcceptRequest(n)">
            Accept request
          </button>
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
import { notifications, updaterequest } from "../api";
import { IMAGE_BASE_URL, REQUEST } from "../constants";
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
          const content = this.requestContent(n)
          return (
            "requested " +
            (content.name === "accountability"
              ? "an accountability partnership"
              : "a mentorship")
          );
      }
    },
    requestContent(n) {
      const csv = n.content.split(',')
      return {name: csv[0], status: parseInt(csv[1], 10)}
    },
    enableAcceptButton(n) {
      return n.notification_type==='request' && this.requestContent(n).status === REQUEST.STATUS.PENDING
    },
    handleNotificationClick(n) {
      console.log(n)
    },
    handleAcceptRequest(n) {
      updaterequest(n.source_id, REQUEST.STATUS.ACTIVE).then(response => {
        console.log(response)
        if (response.success) {
          n.content = this.requestContent(n).name+',1'
        }
      }).catch(console.log)
    }
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

.request-button {
  float: right;
  max-width: 100px;
}
</style>