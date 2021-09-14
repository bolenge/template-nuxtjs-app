export const state = () => ({
  category_natures: [],
  category_nature: {},
  category_natures_for_collection: [],
  loading: false
})

export const mutations = {
  SET_CATEGORY_NATURES(State, payload) {
    State.category_natures = payload
  },
  SET_CATEGORY_NATURE(State, payload) {
    State.category_nature = payload
  },
  SET_CATEGORY_NATURES_FOR_COLLECTION(State, payload) {
    State.category_natures_for_collection = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('category_natures').then(({ data }) => {
      commit('SET_CATEGORY_NATURES', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  loadNaturesForCollection({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('category_natures').then(({ data }) => {
      let result = data.results.length ? [data.results.pop()] : []
      
      commit('SET_CATEGORY_NATURES_FOR_COLLECTION', result)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
  show({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`category_natures/${payload.id}`)
        .then(({ data }) => {
          commit('SET_CATEGORY_NATURE', data.results)
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}