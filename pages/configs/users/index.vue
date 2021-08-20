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
          baseUrl: 'storage/user_pictures'
        },
        {
          text: 'Nom',
          value: 'lastname',
          type: 'string'
        },
        {
          text: 'Prénom',
          value: 'firstname',
          type: 'string'
        },
        {
          text: 'Sexe',
          value: 'gender',
          type: 'string'
        },
        {
          text: 'Email',
          value: 'email',
          type: 'string'
        },
        {
          text: 'Role',
          value: 'user.role.name',
          type: 'object'
        },
        {
          text: 'Téléphone',
          value: 'phone',
          type: 'string'
        },
        {
          text: 'Fonction',
          value: 'fonction.name',
          type: 'object'
        },
        {
          text: 'Departement',
          value: 'department.name',
          type: 'object'
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions'
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