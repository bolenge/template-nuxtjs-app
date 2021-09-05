export const state = () => ({
  natures: [],
  natures_for_collection: [],
  loading: false
})

export const mutations = {
  SET_NATURES(State, payload) {
    State.natures = payload
  },
  SET_NATURES_FOR_COLLECTION(State, payload) {
    State.natures_for_collection = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('natures').then(({ data }) => {
      commit('SET_NATURES', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  loadNaturesForCollection({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('natures').then(({ data }) => {
      let result = data.results.length ? [data.results.pop()] : []
      
      commit('SET_NATURES_FOR_COLLECTION', result)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`natures/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}