<template>
  <ConfigPanel
    title="Configuration Comptes Caisses"
    create-form-title="Créer Compte"
    edit-form-title="Edition Compte"
    model="account"
    table-title="Liste des Comptes"
    icon-title="typcn-document-text"
    :edited="edited"
    :entity-edited="entityEdited"  
    :entity="entity"
    :headers="headers"
    :fields="fields"
    customLoadAction="loadAccountCashs"
    customModelStateItems="accounts_cashs"
    @launchEdited="onLaunchEdit"
    @edited="onEdited"
    @entityReseted="onEntityReseted"
  />
</template>

<script>
const TYPE_ACCOUNT_BANK = 1
const TYPE_ACCOUNT_CASH = 2
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
          label: 'Intitulé Compte'
        },
        {
          name: 'type_account_id',
          type: 'hidden',
          required: false,
          value: TYPE_ACCOUNT_CASH,
          label: ''
        },
        {
          name: 'currency_id',
          type: 'select',
          required: true,
          itemText: 'code',
          items: this.currencies,
          label: 'Devise'
        },
      ],
      entity: {},
      headers: [
        {
          text: 'Intitulé Compte',
          value: 'name',
          type: 'string'
        },
        {
          text: 'Devise',
          value: 'currency.code',
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
      currencies(state) {
        return state.currency.currencies
      }
    })
  },
  watch: {
    currencies() {
      this.$set(this.fields[2], 'items', this.currencies)
    },
  },
  methods: {
    ...mapActions({
      showAccount: 'account/show',
      loadCurrencies: 'currency/load'
    }),
    async onLaunchEdit(id) {
      this.entityEdited = await this.showAccount({id})
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
    this.loadCurrencies()
  }
}
</script>