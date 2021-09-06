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
          text: 'Initiateur',
          value: 'admin_initiator.user.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Compte Op.',
          value: 'compte_nature.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Source',
          value: 'source',
          type: 'string',
          filterable: true
        },
        {
          text: 'Compte Approvisionné',
          value: 'account.name',
          type: 'object',
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
          text: 'Taux',
          value: 'rate',
          type: 'amount-money',
          filterable: true
        },
        {
          text: 'Montant en USD',
          value: 'usd',
          type: 'amount-money',
          filterable: true
        },
      ],
      fieldsExtract: [
        {
          value: 'created_at',
          text: 'Date'
        },
        {
          value: 'admin_initiator.user.name',
          text: 'Initiateur'
        },
        {
          text: 'Compte Op.',
          value: 'compte_nature.name',
        },
        {
          value: 'source',
          text: 'Source'
        },
        {
          value: 'account.name',
          text: 'Compte Approvisionné'
        },
        {
          value: 'currency.code',
          text: 'Devise'
        },
        {
          value: 'amount',
          text: 'Montant'
        },
        {
          text: 'Taux',
          value: 'rate',
        },
        {
          text: 'Montant en USD',
          value: 'usd',
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