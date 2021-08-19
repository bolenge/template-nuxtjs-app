<template>
  <ConfigStructural
    title="Configuration Fonction"
    createFormTitle="Création de fonction"
    editFormTitle="Edition du fonction"
    model="fonction"
    tableTitle="Liste de fonctions"
    :edited="edited"
    :entityEdited="entityEdited"
    @launchEdited="onLaunchEdit"
    @edited="onEdited"
  />
</template>

<script>
import { mapActions } from 'vuex'
import ConfigStructural from './ConfigStructural'

export default {
  components: {
    ConfigStructural
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
      entity: {
        name: ''
      },
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
    }
  }
}
</script>