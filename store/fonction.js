export const state = () => ({
  fonctions: []
})

export const mutations = {
  SET_FONCTIONS(State, payload) {
    State.fonctions = payload
  }
}

export const actions = {
  load ({ commit }) {
    this.$axios.get('fonctions').then(({ data }) => {
      console.log('Data fonctions', data.results);
      commit('SET_FONCTIONS', data.results)
    }).catch((error) => {
      console.log(error)
    })
  }
}