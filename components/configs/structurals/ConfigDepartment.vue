<template>
  <ConfigStructural
    title="Configuration Departements"
    createFormTitle="Création de departement"
    editFormTitle="Edition du departement"
    model="department"
    tableTitle="Liste de departements"
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
      showDepartment: 'department/show'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showDepartment({id})
      this.edited = true
    },
    onEdited() {
      this.entityEdited = null
      this.edited = false
    }
  }
}
</script>