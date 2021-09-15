<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <Navbar />

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- Sidebar -->
      <Sidebar
        :userRoleId="userRoleId"
        :page-active="pageActive"
        :nav-link-active="navLinkActive"
        :countNewCourriers="countNewCourriers"
        :countFundRequestsEnCours="countFundRequestsEnCours"
        :countNoTransmittedCourriers="countNoTransmittedCourriers"
        :isOfficeDirectorOrCompliance="isOfficeDirectorOrCompliance"
      />

      <!-- partial -->
      <div class="main-panel">
          <Nuxt />

          <!-- Sart footer -->
          <Footer />
          <!-- End footer -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import { mapState, mapActions }  from 'vuex'
import $ from 'jquery'
import Navbar from '@/components/partials/Navbar'
import Sidebar from '@/components/partials/Sidebar'
import Footer from '@/components/partials/Footer'
import Account from '~/mixins/Account'

const COMPLIANCE = 1
const OFFICE_MANAGER = 2

export default {
  mixins: [Account],
  components: {Navbar, Sidebar, Footer},
  computed: {
    ...mapState({
      inboxCourriers(state) {
        return state.courrier.inbox_courriers
      },
      noTransmittedCourriers(state) {
        return state.courrier.no_transmitted_courriers
      },
      fundRequests(state) {
        return state.fund_request.fund_requests_notification
      }
    }),
    pageActive() {
      return this.$store.state.page_active
    },
    navLinkActive() {
      return this.$store.state.nav_link_active
    },
    currentUser() {
      return this.userConnected
    },
    currentAdminConnected() {
      return this.currentUser.admin
    },
    adminValidationLevel() {
      return this.currentAdminConnected.fonction ? this.currentAdminConnected.fonction.validation_level.name : null
    },
    adminValidationLevelId() {
      return this.currentAdminConnected.fonction ? this.currentAdminConnected.fonction.validation_level.id : null
    },
    levelNotifications() {
      return {
        "Conformité": 'En Cours',
        "Chef de Bureau": 'Conforme',
      }
    },
    countNewCourriers() {
      return this
        .inboxCourriers
        .filter((courrier) => !courrier.recipient_consulted).length
    },
    countNoTransmittedCourriers() {
      return this
        .noTransmittedCourriers
        .length
    },
    isOfficeDirectorOrCompliance() {
       if (this.currentAdminConnected) {
        if (this.currentAdminConnected.fonction) {
          const isOfficeDirector = this.currentAdminConnected.fonction.validation_level_id === OFFICE_MANAGER
          const isCompliance = this.currentAdminConnected.fonction.validation_level_id === COMPLIANCE
          
          if (isOfficeDirector || isCompliance) {
            return true
          }
        }
      }

      return false
    },
    userRoleId() {
      return this.currentUser.role.id
    },
    countFundRequestsEnCours() {
      return this
        .fundRequests
        .filter((fundRequest) => this.adminValidationLevelId == 1 && (fundRequest.statuts == 'En Cours' || fundRequest.statuts == 'Approuvé') || this.adminValidationLevelId == 2 && fundRequest.statuts == 'Conforme')
        .length
    }
  },
  mounted() {
    this.collapseItemSidebar()
    this.autoActiveCollapseItem()
  },
  methods: {
    collapseItemSidebar() {
      const $parent = this

      $('[data-toggle="collapse"]').on('click', function(e) {
        const $this = this
        const controls = $(this).attr('aria-controls')

        $('[data-toggle="collapse"]').each(function() {
          if (this != $this) {
            const containerCollapse = $(this).next()

            if ($(containerCollapse).hasClass('show')) {
              $(this).attr('aria-expanded', false)
              $(containerCollapse).removeClass('collapse show')
              $(containerCollapse).addClass('collapsing')

              setTimeout(() => {
                $(containerCollapse).removeClass('collapse')
              }, 500);
            }
          }
        })

        $parent.$store.commit('CHANGE_PAGE_ACTIVE', controls)
      })
    },
    autoActiveCollapseItem() {
      if ($(`[aria-controls="${this.pageActive}"]`)) {
        const $this = $(`[aria-controls="${this.pageActive}"]`).trigger('click')
        const containerCollapse = $($this).next()

        if (!$(containerCollapse).hasClass('show')) {
          $($this).attr('aria-expanded', true)
          
          setTimeout(() => {
            $(containerCollapse).addClass('collapse show')
          }, 500);
        }
      }
    }
  }
}
</script>

<style>

</style>
