export const state = () => ({
  admins: [],
  stats: [],
  loading: false,
})

export const mutations = {
  SET_ADMINS(State, payload) {
    State.admins = payload
  },
  SET_STATS(State, payload) {
    State.stats = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  },
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('admins').then(({ data }) => {
      commit('SET_ADMINS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`admins/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}