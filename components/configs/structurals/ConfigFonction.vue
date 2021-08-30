<template>
  <ConfigPanel
    title="Configuration Fonction"
    createFormTitle="Créer Fonction"
    editFormTitle="Edition Fonction"
    model="fonction"
    tableTitle="Liste des Fonctions"
    :edited="edited"
    :entityEdited="entityEdited"
    :entity="entity"
    :headers="headers"
    :fields="fields"
    @launchEdited="onLaunchEdit"
    @edited="onEdited"
    @entityReseted="onEntityReseted"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ConfigPanel from '../ConfigPanel'

export default {
  components: {
    ConfigPanel
  },
  data() {
    return {
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Intitulé'
        },
        {
          name: 'validation_level_id',
          type: 'select',
          required: false,
          label: 'Niveau Validation',
          items: this.validationLevels,
        }
      ],
      entity: {},
      headers: [
        {
          text: 'Intitulé',
          value: 'name',
          type: 'string'
        },
        {
          text: 'Niveau Validation',
          value: 'validation_level.name',
          type: 'string'
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions'
        }
      ],
      edited: false,
      entityEdited: null
    }
  },
  computed: {
    ...mapState({
      validationLevels(state) {
        return state.validation_level.validation_levels
      }
    })
  },
  watch: {
    validationLevels() {
      this.$set(this.fields[1], 'items', this.validationLevels)
    }
  },
  methods: {
    ...mapActions({
      showFonction: 'fonction/show',
      loadValidationLevels: 'validation_level/load'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showFonction({id})
      this.edited = true
    },
    onEdited() {
      this.entityEdited = null
      this.edited = false
    },
    onEntityReseted() {
      this.entity = {}
    }
  },
  mounted() {
    this.loadValidationLevels()
  }
}
</script>