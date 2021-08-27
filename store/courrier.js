export const state = () => ({
  courriers: [],
  inbox_courriers: [],
  children_courriers: [],
  loading: false
})

export const mutations = {
  SET_COURRIERS(State, payload) {
    State.courriers = payload
  },
  SET_INBOX_COURRIERS(State, payload) {
    State.inbox_courriers = payload
  },
  SET_CHILDREN_COURRIERS(State, payload) {
    State.children_courriers = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  }
}

export const actions = {
  load({ dispatch, commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('courriers').then(({ data }) => {
      commit('SET_COURRIERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },

  show (_, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`courriers/${payload.id}`)
        .then(({ data }) => {
          resolve(data.results)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  loadCourriersNoTransmitted({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('courriers/all/no-transmitted').then(({ data }) => {
      commit('SET_COURRIERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },

  transmits({ dispatch, commit }, payload) {
    commit('SET_LOADING', true)
    
    return new Promise((resolve, reject) => {
      this.$axios.post(`courriers/transmits/${payload.id}`)
        .then(({ data }) => {
          if (data.state) {
            this.$swal({
              title: "Transmission",
              text: 'Operation effectuée avec succès',
              icon: "success",
              confirmButtonText: 'Ok'
            })
          }

          dispatch(`courrier/load`, {}, { root: true })
          dispatch(`courrier/loadCourriersNoTransmitted`, {}, { root: true })

          resolve(data.results)
        })
        .catch((error) => {
          this.$swal({
            title: "Erreur",
            text: 'Une erreur est survenue lors de la transmission, réessayez svp !',
            icon: "warning",
            confirmButtonText: 'Ok'
          })

          reject(error)
        }).finally((_) => {
          commit('SET_LOADING', false)
        })
    })
  },

  loadInboxCourriersAdmin({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('courriers/all/inbox').then(({ data }) => {
      commit('SET_INBOX_COURRIERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },

  loadCourrierChildren({ commit }, payload) {
    commit('SET_LOADING', true)

    this.$axios.get(`courriers/${payload.id}/children`).then(({ data }) => {
      commit('SET_CHILDREN_COURRIERS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
}