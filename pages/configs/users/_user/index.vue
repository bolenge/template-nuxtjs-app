<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-400 mb-4"><span class="typcn typcn-user-outline"></span> Configuration Utilisateurs</h4>
      
      <div class="d-block">
        <nuxt-link class="btn btn-info btn-sm float-left" to="/configs/users">&#8592; Retour</nuxt-link>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Form edit users -->
        <Edit
          api="admins"
          model="admin"
          title="Edition Compte Utilisateur"
          :fields="fields"
          :entity="entityEdited"
          :formRow="true"
          @submitted="onSubmit"
        />
        <!-- End Form edit users -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Global from '~/mixins/Global'
import Edit from '~/components/crud/Edit'

const ROLE_PLATINUM = 3

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Edition d\'un compte utilisateur'
    }
  },
  mixins: [Global],
  components: {
    Edit
  },
  asyncData ({ params }) {
    const slug = +params.user
    return { slug }
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
          required: false,
          label: 'Mot de passe'
        },
      ],
      entityEdited: {}
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
      showAdmin: 'admin/show'
    }),
    onSubmit(entity) {
      this.entityEdited = {}
      this.$router.replace('/configs/users')
    },
    async onLaunchEdit(id) {
      this.$emit('launchEdited', id)
    },
    async setEntityEdited() {
      this.entityEdited = await this.showAdmin({id: this.slug})
      this.setFonctionWatching()
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
    },
    setFonctionWatching() {
      let fonctions

      if (this.entityEdited && this.entityEdited.role_id != ROLE_PLATINUM) {
        fonctions = this.fonctions
      }else {
        fonctions = [{
          id: '',
          name: 'Aucune fonction pour ce rôle'
        }]
      }

      this.$set(this.fields[6], 'items', fonctions)
    }
  },
  mounted() {
    this.loadRoles()
    this.loadFonctions()
    this.loadDepartments()
    this.setEntityEdited()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>