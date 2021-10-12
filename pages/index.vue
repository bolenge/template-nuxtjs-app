<template>
  <div class="text-center">
    <h3 class="my-4 mb-5 font-weight-400">Bienvenu(e) sur {{ APP_NAME }}</h3>
  </div>
</template>

<script>
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  mixins: [Global],
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    // TODO: Some things
  },
  methods: {
    
  }
}
</script>

<style>
  .text-center {
    text-align: center !important;
  }
</style>