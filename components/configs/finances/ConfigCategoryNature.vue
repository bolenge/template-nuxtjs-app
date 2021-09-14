<template>
  <ConfigPanel
    title="Configuration Nature Opérations Niveau 1"
    create-form-title="Créer Nature"
    edit-form-title="Edition Nature"
    model="category_nature"
    table-title="Liste des Nature d'Opérations"
    icon-title="typcn-tags"
    :edited="edited"
    :entity-edited="entityEdited"  
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
        },
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
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions({
      showCategoryNature: 'category_nature/show'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showCategoryNature({id})
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