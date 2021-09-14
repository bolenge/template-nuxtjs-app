<template>
  <ConfigPanel
    title="Configuration Comptes Opérations (Niveau 4)"
    create-form-title="Créer Compte"
    edit-form-title="Edition Compte"
    model="compte_nature"
    table-title="Liste de Comptes d'Opérations"
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
          name: 'sub_nature_id',
          type: 'select',
          required: true,
          itemText: 'name',
          items: this.subNatures,
          label: 'Nature Opération Niveau 3'
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
          text: 'Nature Op. Niveau 3',
          value: 'sub_nature.name',
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
      subNatures(state) {
        return state.sub_nature.sub_natures
      }
    })
  },
  watch: {
    subNatures() {
      this.$set(this.fields[1], 'items', this.subNatures)
    },
  },
  methods: {
    ...mapActions({
      showCompteNature: 'compte_nature/show',
      loadSubNatures: 'sub_nature/load'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showCompteNature({id})
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
    this.loadSubNatures()
  }
}
</script>