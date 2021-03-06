function postApi(command, data, method, contenttype) {
  const macaroon = localStorage.getItem('macaroon')
  method = method || 'POST'
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const endpoint = `https://${window.location.hostname}:3009/${command}`
    xhr.open(method, endpoint, true);

    if (contenttype !== 'none') xhr.setRequestHeader("Content-Type", contenttype || "application/json")
    if (macaroon)
      xhr.setRequestHeader("Authorization", `macaroon ${macaroon}`)

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (e) {
          reject(e.message)
        }
      }
      if (this.readyState === XMLHttpRequest.DONE && this.status === 403) {
        const response = JSON.parse(this.responseText)
        reject(new Error(response.err))
      }
    };

    xhr.onerror = reject

    if (method === 'GET') xhr.send(JSON.stringify(data))
    else if (!contenttype) xhr.send(JSON.stringify(data))
    else xhr.send(data)
  });
}

function getApi(command) {
  return postApi(command, null, 'GET')
}

function login(username, password) {
  return postApi('login', {username, password})
}

function newuser(username, password, fullname, email) {
  return postApi('newuser', {username, password, fullname, email})
}

function newgroup(name, description) {
  return postApi('newgroup', {name, description})
}

function joingroup(group_id) {
  return postApi('joingroup', {group_id})
}

function post(content, program_id) {
  return postApi('post', {content, program_id})
}

function message(content, recipient_id) {
  return postApi('message', {content, recipient_id})
}

function comment(content, post_id) {
  return postApi('comment', {content, post_id})
}

function follow(followee_id) {
  return postApi('follow', {followee_id})
}

function messages() {
  return getApi('messages')
}

function feed(last, program_id) {
  return postApi('feed', {last, program_id})
}

function like(item_id, item_type) {
  return postApi('like', {item_id, item_type})
}

function likes(item_id, item_type) {
  return postApi('likes', {item_id, item_type})
}

function offer(offer_type, offer_value) {
  return postApi('offer', {offer_type, offer_value})
}

function request(request_type, requestee_id) {
  return postApi('request', {request_type, requestee_id})
}

function updaterequest(request_id, request_status) {
  return postApi('updaterequest', {request_id, request_status})
}

function uploadUserImage(formdata, command) {
  return postApi(command, formdata, 'POST', `none`)
}

function userinfo(user_id) {
  return postApi('userinfo', {user_id})
}

function userlist(filter) {
  if (!filter) filter = {}
  return postApi('userlist', filter)
}

function notifications() {
  return postApi('notifications')
}

function actions() {
  return postApi('actions')
}

function searchusers(search) {
  return postApi('searchusers', {search})
}

function user(user_id) {
  return postApi('user', {user_id})
}

function getcomment(comment_id) {
  return postApi('getcomment', {comment_id})
}

function getlike(id) {
  return postApi('getlike', {id})
}

function follows(user_id) {
  return postApi('follows', {user_id})
}

function userposts(user_id) {
  return postApi('userposts', {user_id})
}

function newnotifications() {
  return postApi('newnotifications', {})
}

function seeall() {
  return postApi('seeall', {})
}

function addprogram(program) {
  return postApi('addprogram', program)
}

function programs(program) {
  return getApi('programs')
}

function participate(program_id) {
  return postApi('participate', {program_id})
}

function rate(opts) {
  return postApi('rate', opts)
}

function reviews(item_id, item_type) {
  return postApi('reviews', {item_id, item_type})
}

function updateuser(fullname, email, bio) {
  return postApi('updateuser', {fullname, email, bio})
}

function search(query) {
  return postApi('search', {query})
}

export {
  postApi,
  login,
  newuser,
  newgroup,
  joingroup,
  post,
  message,
  comment,
  follow,
  messages,
  feed,
  like,
  likes,
  offer,
  request,
  updaterequest,
  uploadUserImage,
  userinfo,
  userlist,
  notifications,
  actions,
  searchusers,
  user,
  getcomment,
  getlike,
  follows,
  userposts,
  newnotifications,
  seeall,
  addprogram,
  programs,
  participate,
  rate,
  reviews,
  updateuser,
  search,
}