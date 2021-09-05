<template>
  <TableFilter
    title="Compte Bancaire"
    :headers="headers"
    model="account"
    actionLoad="loadAccountBanks"
    computedItems="accounts_banks"
    :buttons="buttonsAction"
    :showPagination="false"
    :extractData="true"
    :fieldsExtract="fieldsExtract"
    :fileExtractName="fileExtractName"
    @launchEdited="onLaunchEdited"
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
          text: 'Compte',
          value: 'name',
          type: 'string',
          filterable: true
        },
        {
          text: 'Numero de compte',
          value: 'account_number',
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
      ],
      buttonsAction: {
        edit: false,
        delete: false,
        show: true
      },
      fieldsExtract: [
        {
          value: 'name',
          text: 'Compte'
        },
        {
          value: 'account_number',
          text: 'Numero de compte'
        },
        {
          value: 'currency.code',
          text: 'Devise'
        },
        {
          value: 'amount',
          text: 'Montant'
        },
      ]
    }
  },
  computed: {
    fileExtractName() {
      return 'extraction-compte-bancaire-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
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