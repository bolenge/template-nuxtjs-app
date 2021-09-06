import { mapActions, mapState } from 'vuex'
export default {
  computed: {
  },
  mounted() {
    this.loadFundRequests()
    this.loadInboxCourriers()
    this.loadCourriersNoTransmitted()
    this.commitSetPageActive()
  },
  methods: {
    ...mapActions({
      loadFundRequests: 'fund_request/loadFundRequestsForNotification',
      loadInboxCourriers: 'courrier/loadInboxCourriersAdmin',
      loadCourriersNoTransmitted: 'courrier/loadCourriersNoTransmitted',
    }),
    commitSetPageActive() {
      const page = this.currentPage || 'home'

      this.$store.commit('CHANGE_PAGE_ACTIVE', page)

      if (this.currentNavLink) {
        this.$store.commit('CHANGE_NAV_LINK_ACTIVE', this.currentNavLink) 
      }
    }
  }
}