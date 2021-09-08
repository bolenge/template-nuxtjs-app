<template>
  <Edit
    :slug="slug"
    backLink="/requests/inbox"
  />
</template>

<script>
import Edit from '~/components/requests/Edit'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Edition CRF'
    }
  },
  mixins: [Global],
  components: {
    Edit
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