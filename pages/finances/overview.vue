<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-credit-card"></span> Aperçu Rapport Financier</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <OverviewFinancialReport />
      </div>
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import OverviewFinancialReport from '~/components/finances/OverviewFinancialReport'

export default {
  middleware: ['auth', 'auth-superadmin-admin'],
  head() {
    return {
      title: 'Aperçu Rapport Financier'
    }
  },
  mixins: [Global],
  components: {
    OverviewFinancialReport
  },
  data() {
    return {
      j: 1
    }
  },
  computed: {
    randValue() {
      return this.random(Math.random(),10)
    },
    currentPage() {
      return 'finances'
    },
    currentNavLink() {
      return 'overview-finances'
    },
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>