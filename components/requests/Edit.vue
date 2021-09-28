<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-300 mb-4"><span class="typcn typcn-film"></span> Edition CRF</h4>
      <button @click="goBack" class="btn btn-sm btn-info mb-2">&#8592; Retour</button>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8 grid-margin stretch-card">
        <div
          v-if="!entityEdited"
          class="card"
        >
          <div class="card-header">
            <h3 class="card-title text-normal text-center mb-0 font-weight-400">Edition CRF</h3>
          </div>
          <div class="card-body">
            <h4 class="text-center">Chargement...</h4>
          </div>
        </div>
        <!-- Form create fund_requests -->
        <Edit
          v-else
          api="fund_requests"
          model="fund_request"
          title="Edition CRF"
          :fields="fields"
          :entity="entityEdited"
          :formRow="true"
          :updateConfirmation="updateConfirmation"
          @submitted="onSubmit"
        />
        <!-- End Form create fund_requests -->
      </div>
    </div>

    <script src="/js/file-upload.js"></script>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'
import Edit from '~/components/crud/Edit'

const SUPER_ADMIN = 1

export default {
  props: {
    slug: {
      type: Number,
      required: true
    },
    backLink: {
      type: String,
      default: '/requests/synthesis'
    },
  },
  mixins: [Global, Account],
  components: {
    Edit
  },
  data() {
    return {
      entity: {},
      entityEdited: null,
      updateConfirmation: {
        title: 'Edition',
        message: 'Voulez vous enregistrer cette modification ?'
      }
    }
  },
  computed: {
    ...mapState({
      currencies(state) {
        return state.currency.currencies
      },
      user(state) {
        return state.user.user
      },
      accounts(state) {
        return state.account.accounts
      },
      typeAccounts(state) {
        return state.type_account.type_accounts
      },
      subNatures(state) {
        return state.sub_nature.sub_natures
      },
      natures(state) {
        return state.nature.natures
      },
      compteNatures(state) {
        return state.compte_nature.compte_natures
      },
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
    currentAdminConnected() {
      return this.currentUser.admin
    },
    hasApproveStatus() {
      return this.entityEdited ? this.entityEdited.statuts_approve : null
    },
    isOfficeDirectorOrCompliance() {
       if (this.currentAdminConnected) {
        if (this.currentAdminConnected.fonction) {
          const isOfficeDirector = this.currentAdminConnected.fonction.name === 'Directrice Bureau' || this.currentAdminConnected.fonction.name === 'Directeur Bureau'
          if (isOfficeDirector || this.currentAdminConnected.fonction.name === 'Conformité') {
            return true
          }
        }
      }

      return false
    },
    fields() {
      return [
        {
          name: 'requestor',
          type: 'text',
          required: true,
          label: 'Initié par',
          value:  this.currentUserName,
          disabled: true
        },
        {
          name: 'date_issue',
          type: 'text',
          required: true,
          label: 'Date de la demande',
          value: this.formatDate('dd/MM/yyyy', new Date),
          disabled: true
        },
        {
          name: 'object',
          type: 'text',
          required: true,
          label: 'Objet de la demande',
        },
        {
          name: 'date_use',
          type: 'date',
          required: false,
          label: 'Date d\'utilisation',
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          label: 'Description de la demande',
          colClass: 'col-lg-12'
        },
        {
          name: 'date_supporting_documents',
          type: 'date',
          required: false,
          label: 'Date Remise Pièces Justificatives',
        },
        {
          name: 'insert_administration_bases',
          type: 'file',
          required: false,
          label: 'Uploader soubassements Administratifs',
        },
        {
          name: 'admin_fund_requestor_id',
          type: 'hidden',
          required: false,
          value: this.currentAdminId
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Montant',
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
          name: 'statuts',
          type: 'hidden',
          required: false,
          label: '',
          value: 'En Cours'
        },
      ]
    },
  },
  watch: {
    currencies() {
      this.$set(this.fields[9], 'items', this.currencies)
    },
    currentUserName() {
      this.$set(this.fields[0], 'value', this.currentUserName)
    },
    currentAdminId() {
      this.$set(this.fields[7], 'value', this.currentAdminId)
    },
    currentUser() {
      console.log('this.currentUser', this.currentUser);
    },
    natures() {
      if (this.isOfficeDirectorOrCompliance) {
        this.$set(this.fields[12], 'items', this.natures)
      }
    },
    subNatures() {
      if (this.isOfficeDirectorOrCompliance) {
        this.$set(this.fields[13], 'items', this.subNatures)
      }
    },
    compteNatures() {
      if (this.isOfficeDirectorOrCompliance) {
        this.$set(this.fields[14], 'items', this.compteNatures)
      }
    },
    accounts() {
      if (this.isOfficeDirectorOrCompliance) {
        const index = this.fields.findIndex((field) => field.name == 'account_id')
        if (index > -1) {
          this.$set(this.fields[18], 'items', this.accounts)
        }
      }
    },
  },
  methods: {
    ...mapActions({
      loadCurrencies: 'currency/load',
      loadUser: 'user/loadUser',
      showFundRequest: 'fund_request/show',
      loadTypeAccounts: 'type_account/load',
      loadNatures: 'nature/load',
      loadSubNatures: 'sub_nature/load',
      loadCompteNatures: 'compte_nature/load',
      loadAccountsByType: 'account/loadAccountsByType'
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/requests/inbox')
    },
    async setEntityEdited() {
      this.entityEdited = await this.showFundRequest({id: this.slug})
      this.entityEdited.statuts = 'En Cours'
      this.entityEdited.statuts_conform = ''
      this.entityEdited.statuts_approve = ''
      this.loadAccounts()
    },
    loadAccounts() {
      this.loadAccountsByType({id: this.entityEdited.type_account_id})
    },
    goBack() {
      this.$router.replace(this.backLink)
    }
  },
  mounted() {
    this.loadCurrencies()
    this.loadTypeAccounts()
    this.loadNatures()
    this.loadSubNatures()
    this.loadCompteNatures()
    this.loadUser()
    this.setEntityEdited()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>