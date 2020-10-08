export const PAGE = {
  FEED: 0,
  MESSAGES: 1,
  NOTIFICATIONS: 2,
  PROFILE: 3,
  GROUPS: 4,
  PEOPLE: 5,
  PROGRAM: 6,
  POST: 7,
  FOLLOWS: 8,
}

export const PAGE_COMPONENTS = [
  "Feed", 
  "Messages", 
  "Notifications", 
  "Profile", 
  "Groups", 
  "People", 
  "Program", 
  "Post",
  "Follows"
]

export const LIKE = {
  POST: 0,
  GROUP_POST: 1,
}

export const IMAGE_BASE_URL = 'https://127.0.0.1:3009/image'

export const REQUEST = {
  TYPE: {
    ACCOUNTABILITY: 0,
    MENTOR: 1
  },
  STATUS: {
    PENDING: 0,
    ACTIVE: 1,
    TERMINATED: 2
  }
}
export const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/100x100'
export const DEFAULT_COVER_URL = 'https://via.placeholder.com/800x400'