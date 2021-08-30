<template>
  <Detail
    :slug="slug"
    backLink="/courriers/inbox"
  />
</template>

<script>
import Detail from '~/components/courriers/Detail'
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'


export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Edition d\'un courrier'
    }
  },
  mixins: [Global],
  components: {
    Detail,
    TableFilter
  },
  asyncData ({ params }) {
    const slug = +params.courrier
    return { slug }
  },
  computed: {
  }
}
</script>