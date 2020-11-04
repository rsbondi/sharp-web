<template>
  <div>
    <div class="feed-img-container" v-if="post.avatar_image">
      <img class="feed-avatar-img" :src="`${IMAGE_BASE_URL}/${post.avatar_image}`"/>
    </div>
    {{post.fullname}}  <ProfileLink :user="post" />
  </div>
  <div>
    <Time :created_at="post.created_at" />
  </div>
  <div class="post-content">
    <Content :post="post"/>
  </div>
  <div class="feedback">
    <div class="like-segment" @click="likePost">
      <div class="feedback-item" :class="ilikeStyle"><LikeIcon/></div> <div class="feedback-item feedback-value" v-if="post.likes">{{post.likes}}</div>
    </div>
    <div class="comments" @click="toggleComments">
      <div class="feedback-item"><CommentIcon/></div> <div class="feedback-item feedback-value" v-if="post.comments.length">{{post.comments.length}}</div>
    </div>
  </div>
  <div>
      <!-- <transition name="expand">   -->
    <div v-show="showComments">
      <ul class="comment">
        <li v-for="comment in post.comments" :key="comment.id">
          <Comment :comment="comment"/>
        </li>
      </ul>
      <input @keyup.enter="doComment" v-model="commentContent" type="text" placeholder="Comment" />
    </div>
      <!-- </transition> -->
  </div>
</template>

<script>
import Comment from './Comment.vue'
import ProfileLink from './ProfileLink.vue'
import Time from './Time.vue'
import Content from './Content.vue'
import { IMAGE_BASE_URL, LIKE } from '../constants'
import { comment, like } from "../api"
import CommentIcon from './icons/CommentIcon'
import LikeIcon from './icons/LikeIcon'

export default {
  name: 'FeedItem',
  props: {
    post: Object,
    expandComments: Boolean
  },
  components: { Comment, CommentIcon, LikeIcon, ProfileLink, Time, Content },
  data() {
    return {
      showComments: this.expandComments,
      IMAGE_BASE_URL,
      commentContent: ""
    }
  },
  computed: {
    ilikeStyle() {
      return this.post.ilike ? 'ilike' : 'like-icon'
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments
    },
    doComment() {
      comment(this.commentContent, this.post.id).then(response => {
        this.commentContent = ""
        // this.$store.dispatch('getfeed')
      }).catch(console.log)
    },
    likePost() {
      like(this.post.id, LIKE.POST).then(response => {
        if (response.success) {
          if (response.action === 'like') {

            this.post.ilike = 1
            this.post.likes++
          }
          else {
            this.post.ilike = 0
            this.post.likes--
          } 
        }
      }).catch(console.log)
    }
  }
}
</script>

<style>
.feedback {
  display: flex;
  justify-content: center;
}

.like-segment {
  width: 250px;
}

.feedback-item {
  float: left;
  cursor: pointer;
}

.feedback-value {
  margin: 0.3em 0 0 .6em;
  color: gray;
}

.ilike {
  fill: #ff6666;
}

.like-icon {
  fill: white;
}
</style>
