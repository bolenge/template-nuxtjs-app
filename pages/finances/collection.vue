<template>
  <Create />
</template>
<script>
import Global from '~/mixins/Global'
import Create from '~/components/finances/Create'

export default {
  middleware: ['auth', 'auth-superadmin-admin'],
  head() {
    return {
      title: 'Encaissement de fonds'
    }
  },
  mixins: [Global],
  components: {
    Create
  },
  data() {
    return {
      form: {
        type_account: 1
      }
    }
  },
  computed: {
    currentPage() {
      return 'finances'
    },
    currentNavLink() {
      return 'collection-finances'
    },
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>