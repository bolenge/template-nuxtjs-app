<template>
  <TableRapportFinancier
    :counter="false"
    :headers="headers"
    model="transaction"
    actionLoad="load"
    :extractData="true"
    :fileExtractName="fileExtractName"
    :fieldsExtract="fieldsExtract"
  />
</template>

<script>
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'
import TableRapportFinancier from './TableRapportFinancier'

export default {
  mixins: [Global],
  components: {
    TableFilter,
    TableRapportFinancier
  },
  data () {
    return {
      headers: [
        {
          text: '',
          value: 'created_at',
          type: 'string',
          filterable: true
        },
        {
          text: 'Nature OP (Niv. 1)',
          value: 'sub_nature.nature.name',
          type: 'object',
          filterable: true,
          colspan: 2
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