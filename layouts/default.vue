<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <Navbar />

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- Sidebar -->
      <Sidebar
        :page-active="pageActive"
        :nav-link-active="navLinkActive"
        :countNewCourriers="countNewCourriers"
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

export default {
  mixins: [Account],
  components: {Navbar, Sidebar, Footer},
  computed: {
    ...mapState({
      inboxCourriers(state) {
        return state.courrier.inbox_courriers
      }
    }),
    pageActive() {
      return this.$store.state.page_active
    },
    navLinkActive() {
      return this.$store.state.nav_link_active
    },
    countNewCourriers() {
      return this
        .inboxCourriers
        .filter((courrier) => !courrier.recipient_consulted).length
    }
  },
  mounted() {
    this.loadInboxCourriers()
    this.collapseItemSidebar()
    this.autoActiveCollapseItem()
  },
  methods: {
    ...mapActions({
      loadInboxCourriers: 'courrier/loadInboxCourriersAdmin'
    }),
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
          console.log(containerCollapse);
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
