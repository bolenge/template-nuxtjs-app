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
import { mapActions } from 'vuex'
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
          text: 'Actions',
          value: '',
          type: 'actions'
        }
      ],
      edited: false,
      entityEdited: null
    }
  },
  methods: {
    ...mapActions({
      showFonction: 'fonction/show'
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
  }
}
</script>