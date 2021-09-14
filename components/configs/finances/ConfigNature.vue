<template>
  <ConfigPanel
    title="Configuration Nature Opérations Niveau 2"
    create-form-title="Créer Nature"
    edit-form-title="Edition Nature"
    model="nature"
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
        {
          name: 'category_nature_id',
          type: 'select',
          required: true,
          itemText: 'name',
          items: this.categoryNatures,
          label: 'Nature Opération Niveau 1'
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
          text: 'Nature Niveau 1',
          value: 'category_nature.name',
          type: 'object'
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
      categoryNatures(state) {
        return state.category_nature.category_natures
      }
    })
  },
  watch: {
    categoryNatures() {
      this.$set(this.fields[1], 'items', this.categoryNatures)
    },
  },
  methods: {
    ...mapActions({
      showNature: 'nature/show'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showNature({id})
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