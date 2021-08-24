<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Detail de la requête de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form create fund_requests -->
        <Edit
          api="fund_requests"
          model="fund_request"
          title="Detail de la requete de fonds"
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
    }
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
        message: 'Etes-vous sur de votre attribution de conformité ?'
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
    fields() {
      const fields = [
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
          name: 'rate',
          type: 'number',
          required: false,
          label: 'Taux',
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
          name: 'type_account_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.typeAccounts,
          label: 'Mode de paiement'
        },
        {
          name: 'nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.natures,
          label: 'Nature Op. Niv. 1',
          childSync: 'sub_nature_id',
          childItems: 'sub_natures',
        },
        {
          name: 'sub_nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.subNatures,
          label: 'Nature Op. Niv. 2',
          childSync: 'compte_nature_id',
          childItems: 'compte_natures',
          objetEmpty: {
            id: '',
            name: 'Aucune nature op. (Niv. 2)'
          }
        },
        {
          name: 'compte_nature_id',
          type: 'select',
          required: false,
          itemText: 'name',
          items: this.compteNatures,
          label: 'Compte Op. (Niv. 3)',
          objetEmpty: {
            id: '',
            name: 'Aucun compte op. (Niv. 3)'
          }
        },
        {
          name: 'statuts_conform',
          type: 'select',
          required: true,
          label: 'Conformité',
          items: [
            {
              id: 'Conforme',
              name: 'Conforme'
            },
            {
              id: 'Non conforme',
              name: 'Non conforme'
            }
          ]
        },
        {
          name: 'observation',
          type: 'textarea',
          required: false,
          label: 'Observation',
          colClass: 'col-lg-12'
        },
      ]

      if (this.currentAdminConnected) {
        if (this.currentAdminConnected.fonction) {
          if (this.currentAdminConnected.fonction.name === 'Directrice Bureau' || this.currentAdminConnected.fonction.name === 'Directeur Bureau') {
            fields.push({
              name: 'statuts_approve',
              type: 'select',
              required: true,
              label: 'Approbation',
              items: [
                {
                  id: 'Approuvé',
                  name: 'Approuvé'
                },
                {
                  id: 'Rejeté',
                  name: 'Rejeté'
                }
              ]
            })

            this.updateConfirmation.title = 'Approbation'
            this.updateConfirmation.message = 'Etes-vous sur de votre attribution d\'approbation ?'
          }
        }
      }

      return fields
    },
  },
  watch: {
    currencies() {
      this.$set(this.fields[6], 'items', this.currencies)
    },
    currentUserName() {
      this.$set(this.fields[0], 'value', this.currentUserName)
    },
    currentAdminId() {
      this.$set(this.fields[9], 'value', this.currentAdminId)
    },
    currentUser() {
      console.log('this.currentUser', this.currentUser);
    },
    natures() {
      this.$set(this.fields[12], 'items', this.natures)
    },
    subNatures() {
      this.$set(this.fields[13], 'items', this.subNatures)
    },
    compteNatures() {
      this.$set(this.fields[14], 'items', this.compteNatures)
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
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/requests/synthesis')
    },
    async setEntityEdited() {
      this.entityEdited = await this.showFundRequest({id: this.slug})
    },
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