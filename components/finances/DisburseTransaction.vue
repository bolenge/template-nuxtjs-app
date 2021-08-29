<template>
  <TableFilter
    title="Tableau des Désencaissements"
    :headers="headers"
    model="transaction"
    actionLoad="loadDisburseTransactions"
    computedItems="disburse_transactions"
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
          text: 'Nature Op. Niv. 2',
          value: 'sub_nature.name',
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
          text: 'Bénéficiaire',
          value: 'admin_beneficiary.user.name',
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
        {
          text: 'Compte Imputé',
          value: 'account.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Status',
          value: 'statuts',
          type: 'string',
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