<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <nuxt-link to="/requests/synthesis" class="btn btn-sm btn-info mb-2">&#8592; Retour</nuxt-link>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <span
              class="float-right badge"
              :class="badgeStatut"
            >
              {{ requestStatus }}
              <em
                class="typcn "
                :class="badgeTypicon"
              ></em>
            </span>
            <h3 class="card-title mb-0">Détail CRF</h3>
          </div>
          <div class="card-body">
            <div v-if="loadingEntityEdited" class="w-100 h-100">
              <p class="lead">Chargement...</p>
            </div>
            <div v-if="entityEdited" class="row">
              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Initiateur</strong>
                <span class="">{{ entityEdited.admin_fund_requestor.firstname+' '+entityEdited.admin_fund_requestor.lastname }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Date Demande</strong>
                <span class="">{{ entityEdited.date_issue || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Objet Demande</strong>
                <span class="">{{ entityEdited.object || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Description Demande</strong>
                <span class="">{{ entityEdited.description || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Date Remise Pièces Justificatives</strong>
                <a
                  v-if="entityEdited.date_supporting_documents"
                  :href="`${API_BASE_URL}/storage/fichiers/${entityEdited.date_supporting_documents}`"
                  class="btn btn-sm btn-light text-info"
                  target="_blank"
                  :download="`${API_BASE_URL}/storage/fichiers/${entityEdited.date_supporting_documents}`"
                >
                  <span class="typcn typcn-download-outline"></span>
                  Téléchqrger le fichier
                </a>
                <span v-else class="">Aucun fichier</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Date d'utilisation</strong>
                <span class="">{{ entityEdited.date_use || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Montant</strong>
                <span class="">{{ entityEdited.amount }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Devise</strong>
                <span class="">{{ entityEdited.currency ? entityEdited.currency.code : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Taux</strong>
                <span class="">{{ entityEdited.rate || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Mode de paiement</strong>
                <span class="">{{ entityEdited.type_account ? entityEdited.type_account.name : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Compte à débuter</strong>
                <span class="">{{ entityEdited.account ? entityEdited.account.name : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Nature Op. Niv. 1</strong>
                <span class="">{{ entityEdited.nature ? entityEdited.nature.name : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Nature Op. Niv. 2</strong>
                <span class="">{{ entityEdited.sub_nature ? entityEdited.sub_nature.name : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Compte Op. (Niv. 3)</strong>
                <span class="">{{ entityEdited.compte_nature ? entityEdited.compte_nature.name : '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Conformité</strong>
                <span class="">{{ entityEdited.statuts_conform || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Observation</strong>
                <span class="">{{ entityEdited.observation || '---' }}</span>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-3 mb-4">
                <strong class="d-block mb-2">Approbation</strong>
                <span class="">{{ entityEdited.statuts_approve || '---' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!requestExecuted && showValidationForm"
        class="col-lg-4 pt-0"
      >
        <!-- Form create fund_requests -->
        <Edit
          api="fund_requests"
          model="fund_request"
          :title="updateConfirmation.title"
          :fields="fields"
          :entity="entityEdited"
          :formRow="false"
          :updateConfirmation="updateConfirmation"
          fieldComplateMessageConfirmation="statuts_conform"
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
        title: 'Conformité',
        message: 'Cette Requête est-elle'
      },
      requestExecuted: true,
      requestStatuts: null,
      loadingEntityEdited: true,
      badges: {
        'Conforme': 'badge-success',
        'Non conforme': 'badge-danger',
        'Approuvé': 'badge-success',
        'Executé': 'badge-success',
        'Rejeté': 'badge-danger',
        'En etude': 'badge-warning',
      },
      typicons: {
        'Conforme': 'typcn-tick-outline',
        'Non conforme': 'typcn-times',
        'Approuvé': 'typcn-input-checked',
        'Executé': 'typcn-tick',
        'Rejeté': 'typcn-cancel',
        'En etude': 'typcn-time',
      },
      badgeStatut: null,
      requestStatus: null,
      badgeTypicon: null
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
      let fields = [
        {
          name: 'requestor',
          type: 'hidden',
          required: true,
          label: 'Initié par',
          value:  this.currentUserName,
          disabled: true
        },
        {
          name: 'date_issue',
          type: 'hidden',
          required: true,
          label: 'Date de la demande',
          value: this.formatDate('dd/MM/yyyy', new Date),
          disabled: true
        },
        {
          name: 'object',
          type: 'hidden',
          required: true,
          label: 'Objet de la demande',
        },
        {
          name: 'date_use',
          type: 'hidden',
          required: false,
          label: 'Date d\'utilisation',
        },
        {
          name: 'description',
          type: 'hidden',
          required: false,
          label: 'Description de la demande',
          colClass: 'col-lg-12'
        },
        {
          name: 'date_supporting_documents',
          type: 'hidden',
          required: false,
          label: 'Date Remise Pièces Justificatives',
        },
        {
          name: 'insert_administration_bases',
          type: 'hidden',
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
          type: 'hidden',
          required: true,
          label: 'Montant',
        },
        {
          name: 'currency_id',
          type: 'hidden',
          required: true,
          itemText: 'code',
          items: this.currencies,
          label: 'Devise'
        },
      ]

      if (this.currentAdminConnected) {
        if (this.currentAdminConnected.fonction) {
          if (this.isComplianceOrOfficeManager) {
            if (this.hasApproveStatus == 'Approuvé') {
              fields.push({
                name: 'account_id',
                type: 'select',
                required: true,
                label: 'Compte à débuter',
                items: this.accounts
              })

              this.updateConfirmation.title = 'Exécution paiement'
              this.updateConfirmation.message = 'Etes-vous d\'effectuer le paiement de cette requête ?'
            }else {
              if (this.requestStatuts !== 'Conforme') {
                fields = fields.concat([
                  {
                    name: 'rate',
                    type: 'number',
                    required: false,
                    label: 'Taux',
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
                ])
              }
            }
          }

          if (this.isOfficeManager) {
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
    showValidationForm() {
      return (this.requestStatuts !== 'Conforme' && this.requestStatuts !== 'Approuvé')
    }
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
        const index = this.fields.findIndex((field) => field.name == 'nature_id')
        if (index > -1) {
          this.$set(this.fields[index], 'items', this.natures)
        }
      }
    },
    subNatures() {
      if (this.isOfficeDirectorOrCompliance) {
        const index = this.fields.findIndex((field) => field.name == 'sub_nature_id')
        if (index > -1) {
          this.$set(this.fields[index], 'items', this.subNatures)
        }
      }
    },
    compteNatures() {
      if (this.isOfficeDirectorOrCompliance) {
        const index = this.fields.findIndex((field) => field.name == 'compte_nature_id')
        if (index > -1) {
          this.$set(this.fields[index], 'items', this.compteNatures)
        }
      }
    },
    accounts() {
      if (this.isOfficeDirectorOrCompliance) {
        const index = this.fields.findIndex((field) => field.name == 'account_id')
        if (index > -1) {
          this.$set(this.fields[index], 'items', this.accounts)
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
      this.$router.replace('/requests/synthesis')
    },
    async setEntityEdited() {
      this.entityEdited = await this.showFundRequest({id: this.slug})
      this.requestExecuted = this.entityEdited.executed
      this.requestStatuts = this.entityEdited.statuts
      this.badgeStatut = this.badges[this.entityEdited.statuts]
      this.requestStatus = this.entityEdited.statuts
      this.badgeTypicon = this.typicons[this.entityEdited.statuts]
      this.loadingEntityEdited = false
      this.loadAccounts()
    },
    loadAccounts() {
      this.loadAccountsByType({id: this.entityEdited.type_account_id})
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