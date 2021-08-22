<template>
  <Edit
    :slug="slug"
  />
</template>

<script>
import Edit from '~/components/courriers/Edit'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Edition d\'un courrier'
    }
  },
  mixins: [Global],
  components: {
    Edit
  },
  asyncData ({ params }) {
    const slug = +params.courrier
    return { slug }
  },
}
</script>