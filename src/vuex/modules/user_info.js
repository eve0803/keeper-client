import * as types from '../mutation_types'
import Vue from 'vue'
// import router from '../../router.js'

const state = {
  // 保存第一页数据
  // id: '',
  // accessToken: '',
  // loginName: '',
  // avatarUrl: '',
  // score: '',
  // recentTopics: '',
  // recentReplies: '',
  // github: '',
  // createAt: ''
  nickname: '',
  sex: '',
  age: '',
  height: '',
  weight: '',
  email: '',
  about_me: '',
  member_since: '',
  last_seen: '',
  avatar: ''
}

const mutations = {
  // 设置 token 登录名 头像
  [types.SET_BASE_INFO] (state, data) {
    try {
      // state.id = data.id
      // state.accessToken = data.accesstoken
      // state.loginName = data.loginname
      // state.avatarUrl = data.avatar_url
      state.email = data.email
      state.nickname = data.nickname
      state.avatar = data.avatar
      state.sex = data.sex
      state.age = data.age
      state.height = data.height
      state.weight = data.weight
      state.about_me = data.about_me || ''
      state.member_since = data.member_since
      state.last_seen = data.last_seen
      // console.log('set info invoked')
    } catch (err) {
      console.log(err)
    }
  },
  [types.SET_DETAIL] (state, data) {
    try {
      // state.score = data.score
      // state.recentTopics = data.recent_topics
      // state.recentReplies = data.recent_replies
      // state.github = data.githubUsername || ''
      // state.createAt = data.create_at
    } catch (err) {
      console.log(err)
    }
  }
}

let sessionStorage = window.sessionStorage

let storeBaseInfo = (data) => {
  sessionStorage.setItem('BaseInfo', JSON.stringify(data))
}
let storeDetailInfo = (data) => {
  sessionStorage.setItem('DetailInfo', JSON.stringify(data))
}

const actions = {
  // 获取存储在sessionStorage中的数据
  getUserStore: ({ commit }) => {
    if (sessionStorage.getItem('BaseInfo')) {
      let data = JSON.parse(sessionStorage.getItem('BaseInfo'))
      commit(types.SET_BASE_INFO, data)
    }
    if (sessionStorage.getItem('DetailInfo')) {
      let data = JSON.parse(sessionStorage.getItem('DetailInfo'))
      commit(types.SET_DETAIL, data)
    }
  },
  // 设置基础数据
  // setBaseInfo: ({ commit }, data, callback) => {
  setBaseInfo: ({ commit }, payload) => {
    Vue.http.post('http://localhost:5000/api/v1.0/login/', payload.data)
    .then(function (res) {
      let data = res.data
      console.log(data)
      if (res.ok) {
        // data.accesstoken = token
        // delete data.success
        storeBaseInfo(data)
        commit(types.SET_BASE_INFO, data)
        commit(types.SET_LOGIN, true)
        commit(types.SET_LOADING, false)
        payload.callback()
        // router.push({ path: '/treatment-record' })
      } else {
        console.log(data.error_msg)
        // callback(setMsg(false, data.error_msg))
      }
    }).catch(err => {
      console.info(err)
      // let errBody = JSON.parse(err.body)
      // callback(setMsg(false, errBody.error_msg))
    })
  }
}

export default {
  state,
  mutations,
  actions
}
