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
import $ from 'jquery'
import Navbar from '@/components/partials/Navbar'
import Sidebar from '@/components/partials/Sidebar'
import Footer from '@/components/partials/Footer'
import Account from '~/mixins/Account'

export default {
  mixins: [Account],
  components: {Navbar, Sidebar, Footer},
  computed: {
    pageActive() {
      return this.$store.state.page_active
    },
    navLinkActive() {
      return this.$store.state.nav_link_active
    }
  },
  mounted() {
    this.collapseItemSidebar()
  },
  methods: {
    collapseItemSidebar() {
      const $parent = this

      $('[data-toggle="collapse"]').click(function(e) {
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
    }
  }
}
</script>

<style>

</style>
