import { serialize } from 'object-to-formdata'

export const state = () => ({
  users: [],
  user: {},
  loading: false
})

export const mutations = {
  SET_USERS(State, payload) {
    State.users = payload
  },
  SET_USER(State, payload) {
    State.user = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('users').then(({ data }) => {
      commit('SET_USERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`users/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loadUser({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('auth/user').then(({ data }) => {
      commit('SET_USER', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },

  changePassword ({ dispatch }, { entity }) {
    const formData = serialize(entity)

    return new Promise(
      (resolve, reject) => {
        this.$axios.post('auth/change-password', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      }
    )
  },
  forgotPassword ({ dispatch }, { entity }) {
    const formData = serialize(entity)

    return new Promise(
      (resolve, reject) => {
        this.$axios.post('auth/forgot-password', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((_) => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      }
    )
  },
}