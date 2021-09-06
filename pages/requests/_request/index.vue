<template>
  <Detail
    :slug="slug"
    :synthesis="true"
  />
</template>

<script>
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