<template>
  <div class="content-wrapper">
    <h4 class="font-weight-400 mb-4"><span class="typcn typcn-credit-card"></span> Encaissement</h4>

    <div class="row justify-content-center">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form create transactions -->
        <Create
          api="transactions"
          model="transaction"
          title="Encaissement de Fonds"
          :fields="fields"
          :entity="entity"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form create transactions -->
      </div>
    </div>

    <script src="/js/file-upload.js"></script>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'
import Create from '~/components/crud/Create'

const TYPE_TRANSACTION_COLLECTION = 1

export default {
  mixins: [Global, Account],
  components: {
    Create
  },
  data() {
    return {
      entity: {}
    }
  },
  computed: {
    ...mapState({
      currencies(state) {
        return state.currency.currencies
      },
      typeAccounts(state) {
        return state.type_account.type_accounts
      }
    }),
    adminId() {
      return this.currentAdmin.id
    },
    currentUser() {
      return this.userConnected
    },
    currentUserName() {
      return this.currentUser.name
    },
    currentAdminId() {
      return this.currentUser.admin.id
    },
    fields() {
      return [
        {
          name: 'source',
          type: 'text',
          required: true,
          label: 'Source',
        },
        {
          name: 'currency_id',
          type: 'select',
          required: true,
          itemText: 'code',
          items: this.currencies,
          label: 'Devise'
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Montant',
        },
        {
          name: 'rate',
          type: 'number',
          required: false,
          label: 'Taux',
        },
        {
          name: 'type_account_id',
          type: 'select',
          required: true,
          itemText: 'name',
          items: this.typeAccounts,
          label: 'Type compte à approvionner',
          childSync: 'account_id',
          childItems: 'accounts',
        },
        {
          name: 'account_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: [],
          label: 'Compte à approvionner ',
          objetEmpty: {
            id: '',
            name: 'Aucun compte disponible'
          }
        },
        {
          name: 'type_transaction_id',
          type: 'hidden',
          required: false,
          label: '',
          value: TYPE_TRANSACTION_COLLECTION
        },
      ]
    }
  },
  watch: {
    currencies() {
      this.$set(this.fields[1], 'items', this.currencies)
    },
    typeAccounts() {
      this.$set(this.fields[3], 'items', this.typeAccounts)
    },
  },
  methods: {
    ...mapActions({
      loadCurrencies: 'currency/load',
      loadTypeAccounts: 'type_account/load'
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/finances/transactions')
    },
  },
  mounted() {
    this.loadCurrencies()
    this.loadTypeAccounts()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>