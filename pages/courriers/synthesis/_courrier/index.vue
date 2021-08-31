<template>
  <Detail
    :slug="slug"
    backLink="/courriers/synthesis"
  />
</template>

<script>
import Detail from '~/components/courriers/Detail'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Détail Courrier'
    }
  },
  components: {
    Detail,
  },
  asyncData ({ params }) {
    const slug = +params.courrier
    return { slug }
  },
}
</script>