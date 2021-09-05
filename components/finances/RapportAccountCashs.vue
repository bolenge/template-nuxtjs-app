<template>
  <TableFilter
    title="Compte Trésorerie (Caisses)"
    :headers="headers"
    model="account"
    actionLoad="loadAccountCashs"
    computedItems="accounts_cashs"
    :fileExtractName="fileExtractName"
    :buttons="buttonsAction"
    :showPagination="false"
    :extractData="true"
    :fieldsExtract="fieldsExtract"
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
          text: '',
          value: 'account_number',
          type: 'string',
          defaultValue: '4576-9837-9495-74769495-747676',
          filterable: false
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
      return 'extraction-compte-tresorerie-' + this.formatDate('hh-mm-ss-dd-MM-yy', new Date)
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