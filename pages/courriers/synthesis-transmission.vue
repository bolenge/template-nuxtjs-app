<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-mail"></span> Synthèse Transmission Courriers</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          :headers="headers"
          model="courrier"
          :buttons="buttonsAction"
          actionLoad="loadCourriersNoTransmitted"
          :customButtons="customButtons"
          @launchEdited="onLaunchEdited"
          @transmitted="onTransmitted"
          @showed="onShowed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions }  from 'vuex'
import Global from '~/mixins/Global'
import TableFilter from '@/components/crud/TableFilter'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Synthèse transmission de courriers'
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
      customButtons: [
        {
          icon: 'typcn-arrow-forward-outline text-white',
          event: 'transmitted',
          type: 'btn-warning'
        }
      ]
    }
  },
  computed: {
    currentPage() {
      return 'courriers'
    },
    currentNavLink() {
      return 'synthesis-transmission-courriers'
    },
  },
  methods: {
    ...mapActions({
      transmits: 'courrier/transmits'
    }),
    onLaunchEdited(id) {
      // Do something
    },
    onTransmitted(item) {
      this.$swal({
        title: "Transmission",
        text: "Souhaitezvous Transmettre ce Courrier à son destinataire ? ’",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showCancelButton: true
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          this.transmitteCourrier(item)
        }
      });
    },
    async transmitteCourrier(courrier) {
      await this.transmits({id: courrier.id})
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