<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-300 mb-4"><span class="typcn typcn-film"></span> Mes Requêtes</h4>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          :headers="headers"
          model="fund_request"
          actionLoad="loadInboxFundRequestsAdmin"
          :buttonCreate="buttonCreate"
          :buttons="buttonsAction"
          :extractData="true"
          :fieldsExtract="fieldsExtract"
          :fileExtractName="fileExtractName"
          @launchEdited="onLaunchEdited"
          @showed="onShowed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import TableFilter from '~/components/crud/TableFilter'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Synthese des requetes de fonds'
    }
  },
  mixins: [Global],
  components: {
    TableFilter
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          value: 'created_at',
          type: 'date',
          filterable: true
        },
        {
          text: 'Initiateur',
          value: 'admin_fund_requestor.user.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Objet',
          value: 'object',
          type: 'string',
          filterable: true
        },
        {
          text: 'Montant',
          value: 'amount',
          type: 'string',
          filterable: true
        },
        {
          text: 'Devise',
          value: 'currency.code',
          type: 'object',
          filterable: true
        },
        {
          text: 'Taux',
          value: 'rate',
          type: 'amount-money',
          filterable: true
        },
        {
          text: 'Montant en USD',
          value: 'calcul',
          type: 'amount-money',
          filterable: true,
        },
        {
          text: 'Status',
          value: 'statuts',
          type: 'badge',
          types: {
            'Conforme': 'badge-light',
            'Non conforme': 'badge-danger',
            'Approuvée': 'badge-info',
            'Executée': 'badge-success',
            'Rejetée': 'badge-danger',
            'En Cours': 'badge-warning',
          },
          filterable: true
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions',
          filterable: false
        }
      ],
      buttonsAction: {
        edit: false,
        delete: false,
        show: true
      },
      fieldsExtract: [
        {
          value: 'created_at',
          text: 'Date'
        },
        {
          value: 'admin_fund_requestor.user.name',
          text: 'initiateur'
        },
        {
          value: 'object',
          text: 'Objet'
        },
        {
          value: 'amount',
          text: 'Montant'
        },
        {
          value: 'Taux',
          text: 'rate'
        },
        {
          value: 'object',
          text: 'Montant en USD'
        },
        {
          value: 'statuts',
          text: 'Status'
        },
      ]
    }
  },
  computed: {
    randValue() {
      return this.random(Math.random(),10)
    },
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'inbox-requests'
    },
    buttonCreate() {
      return {
        link: '/requests/init',
        text: 'CRF'
      }
    },
    fileExtractName() {
      return 'extraction-syntheses-crf-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
    }
  },
  methods: {
    onLaunchEdited(id) {
      // Do something
    },
    onShowed(id) {
      this.$router.replace('/requests/inbox/'+id)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>