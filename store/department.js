export const state = () => ({
  departments: []
})

export const mutations = {
  SET_DEPARTMENTS(State, payload) {
    State.departments = payload
  }
}

export const actions = {
  load ({ commit }) {
    this.$axios.get('departments').then(({ data }) => {
      console.log('Data departments', data.results);
      commit('SET_DEPARTMENTS', data.results)
    }).catch((error) => {
      console.log(error)
    })
  }
}