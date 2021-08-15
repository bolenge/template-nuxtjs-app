export default {
  computed: {
    userConnected() {
      return this.$auth.user
    },
    getUserMomentLogged() {
      return this.formatDate('hh:mm', this.userConnected.track_user_login.date_logged)
    },
    currentAdmin() {
      return this.$auth.user.admin
    },
    currentUserAvatar() {
      return this.userConnected.avatar
    }
  },
  methods: {
  }
}
