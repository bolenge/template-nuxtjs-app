<template>
  <div class="content-wrapper">
    <div class="container-fluid mb-4">
      <nuxt-link to="/courriers/archives" class="btn btn-sm btn-info">&#8592; Retour</nuxt-link>
    </div>

    <div class="row">
      <div class="col-lg-6 grid-margin stretch-card">
        <DetailCourrier
          :loading="loadingEntityCourrier"
          :entityCourrier="entityCourrier"
        />
      </div>
      <div
        v-if="ownerCourrier"
        class="col-lg-6 grid-margin stretch-card"
      >
        <!-- Form Edit courriers -->
        <Create
          api="courriers"
          model="courrier"
          title="Réponse au courrier"
          :fields="fields"
          :entity="entityRespond"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form Edit courriers -->
      </div>
      <div class="col-lg-12">
        <TableFilter
          title="Liste des réponses"
          model="courrier"
          computedItems="children_courriers"
          :stateItems="true"
          :payloadActionLoad="slug"
          :headers="headers"
          :buttons="buttonsAction"
          emptyDataMessage="Aucune réponse à ce courrier"
          @showed="onShowed"
        />
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
import DetailCourrier from './DetailCourrier'
import TableFilter from '../crud/TableFilter'

const ROLE_ADMIN = 2

export default {
  props: {
    slug: {
      type: Number,
      required: true
    }
  },
  mixins: [Global, Account],
  components: {
    Create,
    DetailCourrier,
    TableFilter
  },
  data() {
    return {
      entity: {},
      entityRespond: {},
      edited: false,
      loadingEntityCourrier: false,
      entityCourrier: null,
      headers: [
        {
          text: 'Date',
          value: 'created_at',
          type: 'date',
          filterable: true
        },
        {
          text: 'Type',
          value: 'type_courrier.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Code',
          value: 'code',
          type: 'string',
          filterable: true
        },
        {
          text: 'Initiateur',
          value: 'admin.user.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Expediteur',
          value: 'sender',
          type: 'string',
          filterable: true
        },
        {
          text: 'Destinataire',
          value: 'admin_recipient.user.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Piece',
          value: 'attachment',
          type: 'attachment',
          baseUrl: 'storage/fichiers',
          filterable: false
        },
        {
          text: 'Importance',
          value: 'importance',
          type: 'badge',
          types: {
            'Normal': 'badge-light',
            'Moyen': 'badge-info',
            'Urgent': 'badge-warning',
            'Très Urgent': 'badge-danger',
          },
          filterable: true
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions',
          filterable: false
        }
      ],
      buttonsAction: {
        edit: false,
        delete: false,
        show: true
      },
      ownerCourrier: false
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
      childrenCourriers(state) {
        return state.courrier.children_courriers
      }
    }),
    adminId() {
      return this.currentAdmin.id
    },
    senderName() {
      return this.userConnected.name
    },
    currentAdminLogged() {
      return this.currentAdmin
    },
    fields() { 
      return [
        {
          name: 'type_courrier_id',
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
          label: 'Code courrier',
          value: this.formatDate('hh/mm/ss/dd/MM/yy', new Date),
          isSync: true
        },
        {
          name: 'sender',
          type: 'text',
          required: true,
          label: 'Expediteur',
          value: this.senderName,
          disabled: true
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
          label: 'Uploader le fichier scanné',
        },
        {
          name: 'importance',
          type: 'select',
          required: true,
          label: 'Importance',
          items: [
            {
              id: 'Très Urgent',
              name: 'Très Urgent',
            },
            {
              id: 'Urgent',
              name: 'Urgent',
            },
            {
              id: 'Moyent',
              name: 'Moyent',
            },
            {
              id: 'Normal',
              name: 'Normal',
            },
          ],
          itemText: 'name',
        },
        {
          name: 'parent_id',
          type: 'hidden',
          required: false,
          label: '',
          value: this.slug
        }
      ]
    }
  },
  watch: {
    typeCourriers() {
      this.$set(this.fields[0], 'items', this.typeCourriers)
    },
    recipients() {
      this.$set(this.fields[3], 'items', this.recipients)
    },
    childrenCourriers() {
      console.log('childrenCourriers', this.childrenCourriers);
    }
  },
  methods: {
    ...mapActions({
      loadTypeCourriers: 'type_courrier/load',
      loadRecipients: 'admin/load',
      showCourrier: 'courrier/show',
      loadCourrierChildren: 'courrier/loadCourrierChildren'
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/courriers/archives')
    },
    async setEntityCourrier() {
      this.loadingEntityCourrier = true
      this.entityCourrier = await this.showCourrier({id: this.slug})
      this.ownerCourrier = this.entityCourrier.admin_recipient_id === this.currentAdminLogged.id && this.entityCourrier.transmitted
      this.loadingEntityCourrier = false
    },
    onShowed(id) {
      this.$router.replace('/courriers/'+id)
    }
  },
  mounted() {
    this.loadTypeCourriers()
    this.loadRecipients()
    this.setEntityCourrier()
    this.loadCourrierChildren({id: this.slug})
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>