import { mapActions, mapState } from 'vuex'
export default {
  computed: {
  },
  mounted() {
    this.loadInboxCourriers()
    this.loadCourriersNoTransmitted()
    this.commitSetPageActive()
  },
  methods: {
    ...mapActions({
      loadInboxCourriers: 'courrier/loadInboxCourriersAdmin',
      loadCourriersNoTransmitted: 'courrier/loadCourriersNoTransmitted',
    }),
    commitSetPageActive() {
      const page = this.currentPage || 'home'
      const navLink = this.currentNavLink || ''
      
      this.$store.commit('CHANGE_PAGE_ACTIVE', page)
      this.$store.commit('CHANGE_NAV_LINK_ACTIVE', navLink)
    }
  }
}