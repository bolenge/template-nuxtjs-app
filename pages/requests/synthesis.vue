<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Synthèse CRF</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          :headers="headers"
          model="fund_request"
          :buttonCreate="buttonCreate"
          :buttons="buttonsAction"
          :extractData="true"
          @launchEdited="onLaunchEdited"
          @showed="onShowed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'

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
            'Conforme': 'badge-success',
            'Non conforme': 'badge-danger',
            'Approuvé': 'badge-success',
            'Executé': 'badge-success',
            'Rejeté': 'badge-danger',
            'En etude': 'badge-warning',
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
      }
    }
  },
  computed: {
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'synthesis-requests'
    },
    buttonCreate() {
      return {
        link: '/requests/init',
        text: 'CRF'
      }
    }
  },
  methods: {
    onLaunchEdited(id) {
      // Do something
    },
    onShowed(id) {
      this.$router.replace('/requests/'+id)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>