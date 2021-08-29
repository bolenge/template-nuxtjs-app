export const state = () => ({
  validation_levels: [],
  loading: false
})

export const mutations = {
  SET_VALIDATION_LEVELS(State, payload) {
    State.validation_levels = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('validation_levels').then(({ data }) => {
      console.log('SET_VALIDATION_LEVELS', data.results)
      commit('SET_VALIDATION_LEVELS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`validation_levels/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}