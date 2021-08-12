export default {
  computed: {
    userConnected() {
      return this.$auth.user
    }
  }
}
