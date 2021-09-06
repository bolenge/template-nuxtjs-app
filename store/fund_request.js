export const state = () => ({
  fund_requests: [],
  fund_requests_notification: [],
  inbox_fund_requests: [],
  loading: false
})

export const mutations = {
  SET_FUND_REQUESTS(State, payload) {
    State.fund_requests = payload
  },
  SET_FUND_REQUESTS_NOTIFICATION(State, payload) {
    State.fund_requests_notification = payload
  },
  SET_LOADING(State, payload) {
    State.loading = payload
  },
  SET_INBOX_FUND_REQUESTS(State, payload) {
    State.inbox_fund_requests = payload
  },
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

  loadFundRequestsForNotification({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('fund_requests').then(({ data }) => {
      commit('SET_FUND_REQUESTS_NOTIFICATION', data.results)
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

  loadInboxFundRequestsAdmin({ commit }) {
    commit('SET_LOADING', true)

    this.$axios.get('fund_requests/all/inbox').then(({ data }) => {
      commit('SET_FUND_REQUESTS', data.results)
      commit('SET_INBOX_FUND_REQUESTS', data.results)
    }).finally((_) => {
      commit('SET_LOADING', false)
    })
  },
}