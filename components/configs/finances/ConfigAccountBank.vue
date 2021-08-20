<template>
  <ConfigPanel
    title="Configuration Comptes Bancaires"
    create-form-title="Création de compte"
    edit-form-title="Edition du compte"
    model="account"
    table-title="Liste de comptes"
    icon-title="typcn-credit-card"
    :edited="edited"
    :entity-edited="entityEdited"  
    :entity="entity"
    :headers="headers"
    :fields="fields"
    customLoadAction="loadAccountBanks"
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
          name: 'account_number',
          type: 'text',
          required: true,
          label: 'Numero Compte'
        },
        {
          name: 'type_account_id',
          type: 'hidden',
          required: false,
          value: TYPE_ACCOUNT_BANK,
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
          text: 'Numero Compte',
          value: 'account_number',
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
      this.$set(this.fields[3], 'items', this.currencies)
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