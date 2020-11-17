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

export const IMAGE_BASE_URL = `https://${window.location.hostname}:3009/image`

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
export const ASSETS_URL = `https://${window.location.hostname}:3009/assets`
export const DEFAULT_AVATAR_URL = `${ASSETS_URL}/user.jpeg`
export const DEFAULT_COVER_URL = `${ASSETS_URL}/cover.jpeg`