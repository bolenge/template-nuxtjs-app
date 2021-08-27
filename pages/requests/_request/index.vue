<template>
  <Detail
    :slug="slug"
  />
</template>

<script>
import Edit from '~/components/requests/Edit'
import Detail from '~/components/requests/Detail'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Detail d\'une requete de fonds'
    }
  },
  mixins: [Global],
  components: {
    Edit,
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
      return 'synthesis-requests'
    },
  }
}
</script>