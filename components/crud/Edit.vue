<template>
  <Form
    :title="title"
    :description="description"
    :fields="fields"
    :entity="entity"
    :loading="loading"
    :model="model"
    :showButtonCancel="showButtonCancel"
    :formRow="formRow"
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
    },
    formRow: {
      type: Boolean,
      default: false
    },
    actionLoad: {
      type: String,
      default: 'load'
    },
    updateConfirmation: {
      type: Object,
      default() {
        return {}
      }
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
      this.loading = true

      try {
        if (this.updateConfirmation.message) {
          this.$swal({
            title: this.updateConfirmation.title || "Confirmation",
            text: this.updateConfirmation.message,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true
          }).then(async ({isConfirmed}) => {
            if (isConfirmed) {
              await this.update({ entity, api: this.api, model: this.model, actionLoad: this.actionLoad })
              this.$toast.success('Modification effectuée avec succès')
              this.$emit('submitted')
            }

            this.loading = false
          });

          this.loading = false
        }else {
          await this.update({ entity, api: this.api, model: this.model, actionLoad: this.actionLoad })
          this.$toast.success('Modification effectuée avec succès')
          this.$emit('submitted')
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        this.$toast.error('Une erreur est survenue, réessayez svp !')

        this.loading = false
      }
    }
  }
}
</script>