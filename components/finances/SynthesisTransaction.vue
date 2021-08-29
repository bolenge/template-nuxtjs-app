<template>
  <TableFilter
    :headers="headers"
    model="transaction"
    actionLoad="loadCollectionTransactions"
    computedItems="collection_transactions"
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
          text: 'Compte',
          value: 'compte_nature.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Regroupement niveau 2',
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
      ]
    }
  },
  computed: {
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