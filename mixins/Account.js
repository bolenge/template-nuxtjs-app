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
    isOfficeManager() {
      return this.currentAdmin.fonction.validation_level_id === OFFICE_MANAGER
    },
    isCompliance() {
      return this.currentAdmin.fonction.validation_level_id === COMPLIANCE
    },
    isComplianceOrOfficeManager() {
      return this.isOfficeManager || this.isCompliance
    },
  },
  methods: {
  }
}
