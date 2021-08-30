<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-400 mb-4"><span class="typcn typcn-mail"></span> Boite de reception courriers</h4>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          model="courrier"
          actionLoad="loadInboxCourriersAdmin"
          computedItems="inbox_courriers"
          :headers="headers"
          :buttonCreate="buttonCreate"
          :buttons="buttonsAction"
          :trClassByCondition="trClassByCondition"
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
      title: 'Boite de reception de courriers'
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
          text: 'RE',
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
          text: 'Expéditeur',
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
          text: 'Pièce',
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
            'Normale': 'badge-info',
            'Moyenne': 'badge-warning',
            'Haute': 'badge-danger',
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
      trClassByCondition: {
        fieldCondition: 'recipient_consulted',
        value: false,
        class: 'bg-light font-weight-bold'
      }
    }
  },
  computed: {
    currentPage() {
      return 'courriers'
    },
    currentNavLink() {
      return 'inbox-courriers'
    },
    buttonCreate() {
      return {
        link: '/courriers/init',
        text: 'Initiation'
      }
    },
  },
  methods: {
    onLaunchEdited(id) {
      // Do something
    },
    onShowed(id) {
      this.$router.replace('/courriers/inbox/'+id)
    }
  },
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>