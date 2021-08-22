<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <nuxt-link to="/courriers/archives" class="btn btn-sm btn-info">&#8592; Retour</nuxt-link>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form Edit courriers -->
        <Edit
          api="courriers"
          model="courrier"
          title="Edition du courrier"
          :fields="fields"
          :entity="entityEdited"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form Edit courriers -->
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
    Edit
  },
  data() {
    return {
      fields: [
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
      entity: {},
      edited: false,
      entityEdited: null
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
    }
  },
  methods: {
    ...mapActions({
      loadTypeCourriers: 'type_courrier/load',
      loadRecipients: 'admin/load',
      showCourrier: 'courrier/show'
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/courriers/archives')
    },
    async setEntityEdited() {
      this.entityEdited = await this.showCourrier({id: this.slug})
    },
    pushStatutField() {
      if (this.userConnected) {
        if (this.userConnected.role.id === ROLE_ADMIN) {
          this.fields.push({
            name: 'statut',
            type: 'select',
            required: true,
            label: 'Statut',
            items: [
              {
                id: 'Normal',
                name: 'Normal',
              },
              {
                id: 'Urgent',
                name: 'Urgent',
              }
            ],
            itemText: 'name',
          })
        }
      }
    }
  },
  mounted() {
    this.loadTypeCourriers()
    this.loadRecipients()
    this.setEntityEdited()
    this.pushStatutField()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>