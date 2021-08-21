<template>
  <div class="content-wrapper">
    <ConfigTypeCourrier />
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import ConfigTypeCourrier from '~/components/configs/courriers/ConfigTypeCourrier'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration courriers'
    }
  },
  mixins: [Global],
  components: {
    ConfigTypeCourrier
  },
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'courriers-configs'
    }
  },
  methods: {
    onSubmit(entity) {
      this.entity = {}
    },
    async onLaunchEdit(id) {
      this.$emit('launchEdited', id)
    },
    onEdited() {
      this.$emit('edited', true)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>