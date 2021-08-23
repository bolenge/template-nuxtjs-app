<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Detail de la requête de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form create fund_requests -->
        <Edit
          api="fund_requests"
          model="fund_request"
          title="Detail de la requete de fonds"
          :fields="fields"
          :entity="entityEdited"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form create fund_requests -->
      </div>
    </div>

    <script src="/js/file-upload.js"></script>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'
import Edit from '~/components/crud/Edit'

export default {
  props: {
    slug: {
      type: Number,
      required: true
    }
  },
  mixins: [Global, Account],
  components: {
    Edit
  },
  data() {
    return {
      entity: {},
      entityEdited: null
    }
  },
  computed: {
    ...mapState({
      currencies(state) {
        return state.currency.currencies
      },
      user(state) {
        return state.user.user
      }
    }),
    adminId() {
      return this.currentAdmin.id
    },
    currentUser() {
      return this.userConnected
    },
    currentUserName() {
      return this.currentUser.name
    },
    currentAdminId() {
      return this.currentUser.admin.id
    },
    fields() {
      return [
        {
          name: 'requestor',
          type: 'text',
          required: true,
          label: 'Initié par',
          value:  this.currentUserName,
          disabled: true
        },
        {
          name: 'date_issue',
          type: 'text',
          required: true,
          label: 'Date de la demande',
          value: this.formatDate('dd/MM/yyyy', new Date),
          disabled: true
        },
        {
          name: 'object',
          type: 'text',
          required: true,
          label: 'Objet de la demande',
        },
        {
          name: 'date_use',
          type: 'date',
          required: true,
          label: 'Date d\'utilisation',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description de la demande',
          colClass: 'col-lg-12'
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Montant',
        },
        {
          name: 'currency_id',
          type: 'select',
          required: true,
          itemText: 'code',
          items: this.currencies,
          label: 'Devise'
        },
        {
          name: 'rate',
          type: 'number',
          required: true,
          label: 'Taux',
        },
        {
          name: 'date_supporting_documents',
          type: 'date',
          required: true,
          label: 'Date Remise Pièces Justificatives',
        },
        {
          name: 'insert_administration_bases',
          type: 'file',
          required: true,
          label: 'Uploader soubassements Administratifs',
        },
        {
          name: 'admin_fund_requestor_id',
          type: 'hidden',
          required: false,
          value: this.currentAdminId
        },
      ]
    }
  },
  watch: {
    currencies() {
      this.$set(this.fields[6], 'items', this.currencies)
    },
    currentUserName() {
      this.$set(this.fields[0], 'value', this.currentUserName)
    },
    currentAdminId() {
      this.$set(this.fields[9], 'value', this.currentAdminId)
    }
  },
  methods: {
    ...mapActions({
      loadCurrencies: 'currency/load',
      loadUser: 'user/loadUser',
      showFundRequest: 'fund_request/show'
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/requests/synthesis')
    },
    async setEntityEdited() {
      this.entityEdited = await this.showFundRequest({id: this.slug})
    },
  },
  mounted() {
    this.loadCurrencies()
    this.loadUser()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>