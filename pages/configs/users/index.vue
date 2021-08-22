<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-user-outline"></span> Configuration Utilisateurs</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <TableFilter
          :headers="headers"
          model="admin"
          :buttonCreate="buttonCreate"
          @launchEdited="onLaunchEdited"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TableFilter from '@/components/crud/TableFilter'
import Global from '~/mixins/Global'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Liste des utilisateurs'
    }
  },
  mixins: [Global],
  components: {
    TableFilter
  },
  data() {
    return {
      headers: [
        {
          text: 'Avatar',
          value: 'avatar',
          type: 'image',
          baseUrl: 'storage/user_pictures',
          filterable: false
        },
        {
          text: 'Nom',
          value: 'lastname',
          type: 'string',
          filterable: true
        },
        {
          text: 'Prénom',
          value: 'firstname',
          type: 'string',
          filterable: true
        },
        {
          text: 'Sexe',
          value: 'gender',
          type: 'string',
          filterable: true
        },
        {
          text: 'Email',
          value: 'email',
          type: 'string',
          filterable: true
        },
        {
          text: 'Role',
          value: 'user.role.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Téléphone',
          value: 'phone',
          type: 'string',
          filterable: true
        },
        {
          text: 'Fonction',
          value: 'fonction.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Departement',
          value: 'department.name',
          type: 'object',
          filterable: true
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions',
          filterable: false
        }
      ]
    }
  },
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'users-configs'
    },
    buttonCreate() {
      return {
        link: '/configs/users/create',
        text: 'Ajouter un utilisateur'
      }
    }
  },
  methods: {
    onLaunchEdited(id) {
      this.$router.replace('/configs/users/'+id)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>