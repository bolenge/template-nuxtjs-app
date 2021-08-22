export const state = () => ({
  compte_natures: [],
  loading: false
})

export const mutations = {
  SET_COMPTE_NATURES(State, payload) {
    State.compte_natures = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('compte_natures').then(({ data }) => {
      commit('SET_COMPTE_NATURES', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`compte_natures/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}