<template>
  <Create />
</template>

<script>
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'
import Create from '~/components/requests/Create'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Initiation d\'une requete de fonds'
    }
  },
  mixins: [Account,Global],
  components: {
    Create
  },
  data () {
    return {
    }
  },
  computed: {
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'init-requests'
    },
    currentDate() {
      return this.formatDate('dd/MM/yyyy', new Date)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>