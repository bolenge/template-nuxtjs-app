<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-mail"></span> Archives Courriers</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          :headers="headers"
          model="courrier"
          :buttonCreate="buttonCreate"
          :buttons="buttonsAction"
          @launchEdited="onLaunchEdited"
          @showed="onShowed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Archives de courriers'
    }
  },
  mixins: [Global],
  components: {
    TableFilter
  },
  data () {
    return {
      headers: [
        {
          text: '',
          value: 'entitled',
          type: 'string',
          filterable: false,
          undashed: false
        },
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
      }
    }
  },
  computed: {
    currentPage() {
      return 'courriers'
    },
    currentNavLink() {
      return 'archives-courriers'
    },
    buttonCreate() {
      return {
        link: '/courriers/init',
        text: 'Initiation'
      }
    }
  },
  methods: {
    onLaunchEdited(id) {
      // 
    },
    onShowed(id) {
      this.$router.replace('/courriers/'+id)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>