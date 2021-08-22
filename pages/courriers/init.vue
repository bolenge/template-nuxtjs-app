<template>
  <div class="content-wrapper">
    <Create />
  </div>
</template>
<script>
import Create from '~/components/courriers/Create'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Initiation d\'un courrier'
    }
  },
  components: {
    Create
  },
  computed: {
    currentPage() {
      return 'courriers'
    },
    currentNavLink() {
      return 'init-courriers'
    },
    adminId() {
      return this.currentAdmin.id
    }
  },
  watch: {
  },
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>