<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-user-outline"></span> Configuration Utilisateurs</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <nuxt-link class="btn btn-info btn-sm float-right" to="/configs/users/create">&plus; Ajouter un utilisateur</nuxt-link>
            <h4 class="card-title text-normal">Liste des utilisateurs</h4>
            <div class="table-responsive">
              <table class="table table-striped" aria-describedby="List users">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Sexe</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Fonction</th>
                    <th>Departement</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 8" :key="i">
                    <td>{{ i }}</td>
                    <td class="py-1">
                      <img src="/images/faces/face1.jpg" alt="image"/>
                    </td>
                    <td>Don de Dieu</td>
                    <td>Bolenge</td>
                    <td>M</td>
                    <td>dondedieubolenge@gmail.com</td>
                    <td>0909876543</td>
                    <td>Developer</td>
                    <td>Developpement</td>
                    <td>
                      <button class="btn btn-sm btn-info">
                        <span class="typcn typcn-pencil"></span>
                      </button>
                      <button class="btn btn-sm btn-danger">
                        <span class="typcn typcn-trash"></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/crud/Form'
import Global from '~/mixins/Global'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Liste des utilisateurs'
    }
  },
  mixins: [Global],
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'users-configs'
    }
  },
  methods: {
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>