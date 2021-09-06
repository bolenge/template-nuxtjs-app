<template>
  <TableFilter
    :headers="headers"
    model="transaction"
    actionLoad="loadCollectionTransactions"
    computedItems="collection_transactions"
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
          text: 'Nature OP (Niv. 1)',
          value: 'sub_nature.nature.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Nature OP (Niv. 2)',
          value: 'sub_nature.name',
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
          text: 'Montant en USD',
          value: 'usd',
          type: 'amount-money',
          filterable: true
        },
      ],
      fieldsExtract: [
        {
          text: 'Date',
          value: 'created_at',
        },
        {
          text: 'Nature OP (Niv. 1)',
          value: 'sub_nature.nature.name',
        },
        {
          text: 'Nature OP (Niv. 2)',
          value: 'sub_nature.name',
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
      ]
    }
  },
  computed: {
    fileExtractName() {
      return 'extraction-rapport-fiancier-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
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