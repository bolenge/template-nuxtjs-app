<template>
  <ConfigPanel
    title="Configuration Nature Operations Niveau 2"
    create-form-title="Créer Nature"
    edit-form-title="Edition Nature"
    model="sub_nature"
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
          name: 'nature_id',
          type: 'select',
          required: true,
          itemText: 'name',
          items: this.natures,
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
          value: 'nature.name',
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
      natures(state) {
        return state.nature.natures
      }
    })
  },
  watch: {
    natures() {
      this.$set(this.fields[1], 'items', this.natures)
    },
  },
  methods: {
    ...mapActions({
      showSubNature: 'sub_nature/show',
      loadNatures: 'nature/load'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showSubNature({id})
      this.edited = true
      console.log(this.entityEdited)
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
    this.loadNatures()
  }
}
</script>