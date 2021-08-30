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
      if (this.currentPage) {
        this.$store.commit('CHANGE_PAGE_ACTIVE', this.currentPage)
      }

      if (this.currentNavLink) {
        this.$store.commit('CHANGE_NAV_LINK_ACTIVE', this.currentNavLink) 
      }
    }
  }
}