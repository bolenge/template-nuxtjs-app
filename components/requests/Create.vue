<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Initiation de requêtes de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form create fund_requests -->
        <Create
          api="fund_requests"
          model="fund_request"
          title="Enregistrement d'une nouvelle requete de fonds"
          :fields="fields"
          :entity="entity"
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
import Create from '~/components/crud/Create'

export default {
  mixins: [Global, Account],
  components: {
    Create
  },
  data() {
    return {
      fields: [
        {
          name: 'admin_fund_requestor_id',
          type: 'select',
          required: true,
          label: 'Type de courrier',
          items: this.typeCourriers,
          syncField: 'code',
          syncCapterValue: 'code',
          syncFieldFromValue: 'code'
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          label: 'Code courrier (Généré automatiquement)',
          value: this.formatDate('hh/mm/ss/dd/MM/yy', new Date),
          isSync: true
        },
        {
          name: 'sender',
          type: 'text',
          required: true,
          label: 'Expediteur '
        },
        {
          name: 'admin_recipient_id',
          type: 'select',
          required: true,
          label: 'Destinataire',
          items: this.recipients,
          itemText: 'firstname',
        },
        {
          name: 'attachment',
          type: 'file',
          required: true,
          label: 'Uploader le fichier scanner ici',
        },
      ],
      entity: {}
    }
  },
  computed: {
    ...mapState({
      typeCourriers(state) {
        return state.type_courrier.type_courriers
      },
      recipients(state) {
        return state.admin.admins
      },
    }),
    adminId() {
      return this.currentAdmin.id
    }
  },
  watch: {
    typeCourriers() {
      this.$set(this.fields[0], 'items', this.typeCourriers)
    },
    recipients() {
      this.$set(this.fields[3], 'items', this.recipients)
    },
  },
  methods: {
    ...mapActions({
      loadTypeCourriers: 'type_courrier/load',
      loadRecipients: 'admin/load',
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/courriers/archives')
    },
  },
  mounted() {
    this.loadTypeCourriers()
    this.loadRecipients()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>