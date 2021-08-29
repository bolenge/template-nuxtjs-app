const COMPLIANCE = 1
const OFFICE_MANAGER = 2

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
    },
    isComplianceOrOfficeManager() {
      return this.currentAdmin.fonction.validation_level_id === OFFICE_MANAGER ||
             this.currentAdmin.fonction.validation_level_id === COMPLIANCE
    },
    isOfficeManager() {
      return this.currentAdmin.fonction.validation_level_id === OFFICE_MANAGER
    }
  },
  methods: {
  }
}
