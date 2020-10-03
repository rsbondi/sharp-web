<template>
  <div class="notifications">
    <div class="notification">
      <div class="notification-img-container" v-if="notification.avatar_image">
        <img class="notification-avatar-img" :src="`${IMAGE_BASE_URL}/${notification.avatar_image}`" />
      </div>
      {{notification.fullname}}&nbsp;
      {{notificationText}}
      <button class="request-button" v-if="enableAcceptButton" @click="handleAcceptRequest">
        Accept request
      </button>
      <div>{{showTime(notification.created_at)}}</div>
      <div v-if="showContent">
        <div @click="handleNotificationClick" class="notification-content">{{notification.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { showTime } from "../util";
import { updaterequest, getlike } from "../api";
import { IMAGE_BASE_URL, REQUEST } from "../constants";
export default {
  name: "Notification",
  data() {
    return {
      IMAGE_BASE_URL,
      showTime: showTime
    };
  },
  props: {
    notification: Object
  },
  methods: {
    handleNotificationClick() {
      switch (this.notification.notification_type) {
        case 'message':
          // TODO: scroll to
          this.$store.dispatch('messageuser', {
            username: this.notification.username, user_id: this.notification.user_id})
          break;
        case 'comment':
          this.$store.dispatch('setactivepost', {
            comment_id: this.notification.source_id,
          })
          break;
        case 'like':
          getlike(this.notification.source_id).then(response => {
            this.$store.dispatch('setactivepost', {
              post_id: response.like.item_id,
            })
          })
          break;
      }
    },
    handleAcceptRequest() {
      updaterequest(this.notification.source_id, REQUEST.STATUS.ACTIVE).then(response => {
        console.log(response)
        if (response.success) {
          this.notification.content = this.requestContent.name+',1'
        }
      }).catch(console.log)
    }

  },
  computed: {
    notificationText() {
      switch (this.notification.notification_type) {
        case "message":
          return "sent you a new message";
        case "request":
          return (
            "requested " +
            (this.requestContent.name === "accountability"
              ? "an accountability partnership"
              : "a mentorship")
          );
        case "accountability":
          return "accepted your accountability request"
        case "mentor":
          return "accepted your mentor request"
        case "follow":
          return "followed you"
        case "like":
          return "liked your post" // TODO: more than just post when implemented.
        case "comment":
          return "commented on your post"
      }
    },
    requestContent() {
      const csv = this.notification.content.split(',')
      return {name: csv[0], status: parseInt(csv[1], 10)}
    },
    enableAcceptButton(n) {
      return this.notification.notification_type==='request' && this.requestContent.status === REQUEST.STATUS.PENDING
    },
    showContent() {
      return this.notification.notification_type==='message' || 
      this.notification.notification_type==='like' ||
      this.notification.notification_type==='comment'
    },
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
  cursor: pointer;
}

.request-button {
  float: right;
  max-width: 100px;
}
</style>