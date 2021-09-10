<template>
  <TableFilter
    title="Tableau des Décaissements"
    :headers="headers"
    model="transaction"
    actionLoad="loadDisburseTransactions"
    computedItems="disburse_transactions"
    :extractData="true"
    :fileExtractName="fileExtractName"
    :fieldsExtract="fieldsExtract"
  />
</template>

<script>
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'

export default {
  mixins: [Global],
  components: {
    TableFilter
  },
  data () {
    return {
      headers: [
        {
          text: 'Date',
          value: 'created_at',
          type: 'date',
          filterable: true
        },
        {
          text: 'Nature Op. Niv. 3',
          value: 'sub_nature.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Compte Op. (Niv. 4)',
          value: 'compte_nature.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Bénéficiaire',
          value: 'beneficiary',
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
          text: 'Montant',
          value: 'amount',
          type: 'amount-money',
          filterable: true
        },
        {
          text: 'Montant en USD',
          value: 'usd',
          type: 'amount-money',
          filterable: true
        },
        {
          text: 'Compte Imputé',
          value: 'account.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Initiateur',
          value: 'admin_initiator.user.name',
          type: 'object',
          filterable: true
        },
      ],
      fieldsExtract: [
        {
          text: 'Date',
          value: 'created_at',
        },
        {
          text: 'Nature Op. Niv. 2',
          value: 'sub_nature.name',
        },
        {
          text: 'Compte Op.',
          value: 'compte_nature.name',
        },
        {
          text: 'Bénéficiaire',
          value: 'admin_beneficiary.user.name',
        },
        {
          text: 'Devise',
          value: 'currency.code',
        },
        {
          text: 'Montant',
          value: 'amount',
        },
        {
          text: 'Montant en USD',
          value: 'usd',
        },
        {
          text: 'Compte Imputé',
          value: 'account.name',
        },
        {
          text: 'Statut',
          value: 'statuts',
        },
      ]
    }
  },
  computed: {
    fileExtractName() {
      return 'extraction-decaissement-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
    }
  },
  methods: {
    onLaunchEdited(id) {
      // Do something
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>