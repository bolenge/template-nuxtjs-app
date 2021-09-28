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
    :classCardBody="classCardBody"
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
    },
    fieldComplateMessageConfirmation: {
      type: String,
      default: ''
    },
    classCardBody: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      loading(state) {
        return state.crud.loading
      }
    })
  },
  methods: {
    ...mapActions({
      update: 'crud/update'
    }),
    async onSubmit (entity) {
      try {
        if (this.updateConfirmation.message) {
          const message = this.fieldComplateMessageConfirmation
            ? this.updateConfirmation.message + ' ' + entity[this.fieldComplateMessageConfirmation] + ' ?'
            : this.updateConfirmation.message
            
          this.$swal({
            title: this.updateConfirmation.title || "Confirmation",
            text: message,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true
          }).then(async ({isConfirmed}) => {
            if (isConfirmed) {
              await this.update({ entity, api: this.api, model: this.model, actionLoad: this.actionLoad })
              this.$toast.success('Opération effectuée avec succès')
              this.$emit('submitted')
            }
          });
        }else {
          await this.update({ entity, api: this.api, model: this.model, actionLoad: this.actionLoad })
          this.$toast.success('Opération effectuée avec succès')
          this.$emit('submitted')
        }
      } catch (error) {
        this.$toast.error('Une erreur est survenue, réessayez svp !')
      }
    }
  }
}
</script>