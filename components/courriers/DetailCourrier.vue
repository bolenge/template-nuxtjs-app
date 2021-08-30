<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title mb-0">{{ title }}</h3>
    </div>

    <div class="card-body">
      <div
        v-if="loading"
        class="text-center lead pt-5"
      >
        Chargement...
      </div>
      <div class="row" v-else-if="entityCourrier">
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Type Courrier</strong>
          <span>{{ entityCourrier.type_courrier.name }}</span>
        </div>
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Code</strong>
          <span>{{ entityCourrier.code }}</span>
        </div>
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Initiateur</strong>
          <span>{{ entityCourrier.admin.user.name }}</span>
        </div>
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Expéditeur</strong>
          <span>{{ entityCourrier.sender }}</span>
        </div>
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Destinataire</strong>
          <span>{{ entityCourrier.sender }}</span>
        </div>
        <div class="col-lg-6 mb-4" >
          <strong class="d-block mb-2">Importance</strong>
          <span>{{ entityCourrier.importance }}</span>
        </div>
        <div class="col-lg-12 mb-4" >
          <a
            :href="`${API_BASE_URL}/storage/fichiers/${entityCourrier.attachment}`"
            class="btn btn-sm btn-light text-info"
            target="_blank"
            :download="`${API_BASE_URL}/storage/fichiers/${entityCourrier.attachment}`"
          >
            <span class="typcn typcn-download-outline"></span>
            Télécharger Fichier du Courrier
          </a>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'

const ROLE_ADMIN = 2

export default {
  props: {
    entityCourrier: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Détail Courrier'
    }
  },
  mixins: [Global, Account],
  components: {
  }
  
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>