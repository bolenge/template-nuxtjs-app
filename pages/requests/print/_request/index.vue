<template>
  <PrintCRF
    :slug="slug"
    backLink="/requests/synthesis"
    title="Mes Requêtes"
  />
</template>

<script>
import PrintCRF from '~/components/requests/PrintCRF'
import Global from '~/mixins/Global'

export default {
  layout: 'login',
  middleware: 'auth',
  head() {
    return {
      title: 'Detail d\'un CRF'
    }
  },
  mixins: [Global],
  components: {
    PrintCRF
  },
  asyncData ({ params }) {
    const slug = +params.request
    return { slug }
  },
  computed: {
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'synthesis-requests'
    },
  }
}
</script>