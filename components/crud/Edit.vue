<template>
  <Form
    :title="title"
    :description="description"
    :fields="fields"
    :entity="entity"
    :loading="loading"
    :model="model"
    :showButtonCancel="showButtonCancel"
    @submitted="onSubmit"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Form from '~/components/crud/Form'
export default {
  components: {
    Form
  },
  props: {
    title: {
      type: String,
      default: 'Nouvel enregsitrement'
    },
    description: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      required: true
    },
    showButtonCancel: {
      type: Boolean,
      default: false
    },
    entity: {
      type: Object,
      default() {
        return {}
      } 
    },
    model: {
      type: String,
      required: true
    },
    api: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions({
      update: 'crud/update'
    }),
    async onSubmit (entity) {
      console.log(entity)
      this.loading = true
      try {
        await this.update({ entity, api: this.api, model: this.model })
        this.$toast.success('Modification effectuée avec succès')
        this.$emit('submitted')
      } catch (error) {
        console.log(error);
        this.$toast.error('Une erreur est survenue, réessayez svp !')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>