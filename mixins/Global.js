export default {
  mounted() {
    this.commitSetPageActive()
  },
  methods: {
    commitSetPageActive() {
      const page = this.currentPage || 'home'
      const navLink = this.currentNavLink || ''
      
      this.$store.commit('CHANGE_PAGE_ACTIVE', page)
      this.$store.commit('CHANGE_NAV_LINK_ACTIVE', navLink)
    }
  }
}