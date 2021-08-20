export const state = () => ({
  accounts: [],
  loading: false
})

export const mutations = {
  SET_ACCOUNTS(State, payload) {
    State.accounts = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('accounts').then(({ data }) => {
      commit('SET_ACCOUNTS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`accounts/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loadAccountBanks({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('accounts/types/banks').then(({ data }) => {
      commit('SET_ACCOUNTS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  loadAccountCashs({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('accounts/types/cashs').then(({ data }) => {
      commit('SET_ACCOUNTS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
}