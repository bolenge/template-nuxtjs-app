<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-400 mb-4"><span class="typcn typcn-credit-card"></span> Encaissement</h4>
    </div>

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
      },
      natures(state) {
        return state.nature.natures_for_collection
      },
    }),
    subNatures() {
      return this.natures.length ? this.natures[0].sub_natures : []
    },
    compteNatures() {
      return this.natures.length ? this.natures[0].compte_natures : []
    },
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
          name: 'nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.natures,
          selected: 1,
          label: 'Nature Op. Niv. 2',
          childSync: 'sub_nature_id',
          childItems: 'sub_natures',
        },
        {
          name: 'sub_nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.subNatures,
          label: 'Nature Op. Niv. 3',
          childSync: 'compte_nature_id',
          childItems: 'compte_natures',
          objetEmpty: {
            id: '',
            name: 'Aucune nature op. (Niv. 3)'
          }
        },
        {
          name: 'compte_nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.compteNatures,
          label: 'Compte Op. (Niv. 4)',
          objetEmpty: {
            id: '',
            name: 'Aucun compte op. (Niv. 4)'
          }
        },
        {
          name: 'beneficiary',
          type: 'text',
          required: true,
          label: 'Bénéficiaire',
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
          type: 'text',
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
    },
  },
  watch: {
    currencies() {
      const index = this.fields.findIndex((field) => field.name == 'currency_id')

      if (index > -1) {
        this.$set(this.fields[index], 'items', this.currencies)
      }
    },
    typeAccounts() {
      const index = this.fields.findIndex((field) => field.name == 'type_account_id')

      if (index > -1) {
        this.$set(this.fields[index], 'items', this.typeAccounts)
      }
    },
    natures() {
      const index = this.fields.findIndex((field) => field.name == 'nature_id')

      if (index > -1) {
        this.$set(this.fields[index], 'items', this.natures)
      }

      const indexSubNature = this.fields.findIndex((field) => field.name == 'sub_nature_id'),
            indexCompteNature = this.fields.findIndex((field) => field.name == 'compte_nature_id')

      if (indexSubNature > -1) {
        console.log('this.natures[0].sub_natures', this.natures[0].sub_natures);
        this.$set(this.fields[indexSubNature], 'items', this.natures[0].sub_natures)
      }

      if (indexCompteNature > -1) {
        this.$set(this.fields[indexCompteNature], 'items', this.compteNatures)
      }
    },
  },
  methods: {
    ...mapActions({
      loadCurrencies: 'currency/load',
      loadTypeAccounts: 'type_account/load',
      loadNatures: 'nature/loadNaturesForCollection',
      loadCompteNatures: 'compte_nature/load',
      loadSubNatures: 'sub_nature/load',
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/finances/transactions')
    },
  },
  mounted() {
    this.loadCurrencies()
    this.loadTypeAccounts()
    this.loadNatures()
    this.loadCompteNatures()
    this.loadSubNatures()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>