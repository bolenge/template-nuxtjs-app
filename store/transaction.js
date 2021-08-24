export const state = () => ({
  transactions: [],
  loading: false
})  

export const mutations = {
  SET_TRANSACTIONS(State, payload) {
    State.transactions = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('transactions').then(({ data }) => {
      commit('SET_TRANSACTIONS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`transactions/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}