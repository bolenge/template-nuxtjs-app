<template>
  <ConfigPanel
    title="Configuration Courriers"
    createFormTitle="Créer Type Courrier"
    editFormTitle="Edition Type Courrier"
    model="type_courrier"
    tableTitle="Liste des Type Courriers"
    iconTitlte="typcn-mail"
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
          label: 'Libellé'
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          label: 'Code'
        }
      ],
      entity: {},
      headers: [
        {
          text: 'Libellé',
          value: 'name',
          type: 'string'
        },
        {
          text: 'Code',
          value: 'code',
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
      showTypeCourrier: 'type_courrier/show'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showTypeCourrier({id})
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