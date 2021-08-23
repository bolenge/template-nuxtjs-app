export const state = () => ({
  fund_requests: [],
  loading: false
})

export const mutations = {
  SET_FUND_REQUESTS(State, payload) {
    State.fund_requests = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('fund_requests').then(({ data }) => {
      commit('SET_FUND_REQUESTS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`fund_requests/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}