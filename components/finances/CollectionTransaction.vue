<template>
  <TableFilter
    title="Tableau des Encaissements"
    model="transaction"
    actionLoad="loadCollectionTransactions"
    computedItems="collection_transactions"
    :headers="headers"
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
          text: 'Compte Impacté ',
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
          text: 'Beneficiaire',
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
          type: 'amount',
          filterable: true
        },
        {
          text: 'Taux',
          value: 'rate',
          type: 'amount',
        },
        {
          text: 'Montant en USD',
          value: 'usd',
          type: 'amount',
          filterable: true
        },
        {
          text: 'Compte Impacte',
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
      ]
    }
  },
  computed: {
    fileExtractName() {
      return 'extraction-encaissement-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
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