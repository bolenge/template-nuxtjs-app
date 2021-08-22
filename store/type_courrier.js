export const state = () => ({
  type_courriers: [],
  loading: false
})

export const mutations = {
  SET_TYPE_COURRIERS(State, payload) {
    State.type_courriers = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('type_courriers').then(({ data }) => {
      commit('SET_TYPE_COURRIERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`type_courriers/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}