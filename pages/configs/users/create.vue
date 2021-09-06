<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-400 mb-4"><span class="typcn typcn-user-outline"></span> Configuration Utilisateurs</h4>

      <div class="d-block">
        <nuxt-link class="btn btn-info btn-sm float-left" to="/configs/users">&#8592; Retour</nuxt-link>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-9 grid-margin stretch-card">
        <!-- Form create users -->
        <Create
          api="admins"
          model="admin"
          title="Créer un Utilisateur"
          :fields="fields"
          :entity="entity"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form create users -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Global from '~/mixins/Global'
import Create from '~/components/crud/Create'

const ROLE_PLATINUM = 3

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Creation d\'un nouvel utilisateur'
    }
  },
  mixins: [Global],
  components: {
    Create
  },
  data() {
    return {
      fields: [
        {
          name: 'lastname',
          type: 'text',
          required: true,
          label: 'Nom'
        },
        {
          name: 'firstname',
          type: 'text',
          required: true,
          label: 'Prénom'
        },
        {
          name: 'email',
          type: 'email',
          required: false,
          label: 'Email'
        },
        {
          name: 'phone',
          type: 'tel',
          required: true,
          label: 'Téléphone'
        },
        {
          name: 'gender',
          type: 'select',
          required: true,
          label: 'Sexe',
          items: [
            {id: 'M', name: 'Homme'},
            {id: 'F', name: 'Femme'},
          ]
        },
        {
          name: 'role_id',
          type: 'select',
          required: true,
          label: 'Rôle',
          items: this.roles,
          childSync: 'fonction_id',
          childItems: 'fonctions',
        },
        {
          name: 'fonction_id',
          type: 'select',
          required: false,
          label: 'Fonction',
          items: [],
          objetEmpty: {
            id: '',
            name: 'Aucune fonction pour ce rôle'
          }
        },
        {
          name: 'department_id',
          type: 'select',
          required: true,
          label: 'Departement',
          items: this.departments
        },
        {
          name: 'avatar',
          type: 'file-image',
          required: false,
          label: 'Avatar',
        },
        {
          name: 'password',
          type: 'password',
          required: true,
          label: 'Mot de passe'
        },
      ],
      entity: {}
    }
  },
  computed: {
    ...mapState({
      roles(state) {
        return state.role.roles
      },
      fonctions(state) {
        return state.fonction.fonctions
      },
      departments(state) {
        return state.department.departments
      },
    }),
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'users-configs'
    }
  },
  watch: {
    fonctions() {
      this.setRolesWatching()
    },
    roles() {
      this.setRolesWatching()
    },
    departments() {
      this.$set(this.fields[7], 'items', this.departments)
    }
  },
  methods: {
    ...mapActions({
      loadRoles: 'role/load',
      loadFonctions: 'fonction/load',
      loadDepartments: 'department/load',
    }),
    onSubmit(entity) {
      this.entity = {}
      this.$router.replace('/configs/users')
    },
    async onLaunchEdit(id) {
      this.$emit('launchEdited', id)
    },
    onEdited() {
      this.$emit('edited', true)
    },
    setRolesWatching() {
      let roles = this.roles

      if (roles) {
        if (this.fonctions) {
          roles = roles.map((role) => {
            role.fonctions = role.id != ROLE_PLATINUM ? this.fonctions : []

            return role
          })
        }
      }

      this.$set(this.fields[5], 'items', roles)
    }
  },
  mounted() {
    this.loadRoles()
    this.loadFonctions()
    this.loadDepartments()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>