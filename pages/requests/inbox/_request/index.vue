<template>
  <Detail
    :slug="slug"
    backLink="/requests/inbox"
  />
</template>

<script>
import Detail from '~/components/requests/Detail'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Detail d\'un CRF'
    }
  },
  mixins: [Global],
  components: {
    Detail
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
      return 'inbox-requests'
    },
  }
}
</script>