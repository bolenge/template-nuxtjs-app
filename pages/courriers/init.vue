<template>
  <Create />
</template>
<script>
import Create from '~/components/courriers/Create'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Initiation d\'un courrier'
    }
  },
  mixins: [Global],
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
  },
}
</script>

<style>
</style>