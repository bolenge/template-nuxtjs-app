<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <Navbar />

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- Sidebar -->
      <Sidebar />

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
import Navbar from '@/components/partials/Navbar'
import Sidebar from '@/components/partials/Sidebar'
import Footer from '@/components/partials/Footer'
import Account from '~/mixins/Account'

export default {
  mixins: [Account],
  components: {Navbar, Sidebar, Footer},
  mounted() {
    console.log(this.userConnected)
  }
}
</script>

<style>

</style>
