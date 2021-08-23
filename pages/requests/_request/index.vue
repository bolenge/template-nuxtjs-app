<template>
  <Edit
    :slug="slug"
  />
</template>

<script>
import Edit from '~/components/requests/Edit'
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
    Edit
  },
  asyncData ({ params }) {
    const slug = +params.request
    return { slug }
  },
}
</script>