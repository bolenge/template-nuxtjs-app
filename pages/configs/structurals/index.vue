<template>
  <div class="content-wrapper">
    <div class="container-fluid mb-4">
      <div class="col-6 offset-lg-3">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="config-departments-tab" data-toggle="tab" href="#config-departments" role="tab" aria-controls="config-departments" aria-selected="true"><span class="typcn typcn-home-outline"></span> Configuration Departements</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="config-fonction-tab" data-toggle="tab" href="#config-fonction" role="tab" aria-controls="config-fonction" aria-selected="false"><span class="typcn typcn-puzzle-outline"></span> Configuration Fonctions</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="config-departments" role="tabpanel" aria-labelledby="config-departments-tab">
        <h2 class="title mb-4"><span class="typcn typcn-home-outline"></span> Configuration Departements</h2>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <!-- Form create department -->
            <Form
              title="Création de departement"
              :fields="fields"
              :entity="entity"
            />
            <!-- End Form create department -->
          </div>

          <div class="col-lg-8 grid-margin stretch-card">
            <SimpleTable
              title="Liste de departements"
              :headers="headers"
              model="department"
            />
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="config-fonction" role="tabpanel" aria-labelledby="config-fonction-tab">
        <h1><span class="typcn typcn-puzzle-outline"></span> Configuration Fonctions</h1>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <Form
              title="Création de fonction"
              :fields="fields"
              :entity="entity"
            />
          </div>
          
          <div class="col-lg-8 grid-margin stretch-card">
            <SimpleTable
              title="Liste de fonctions"
              :headers="headers"
              model="fonction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Global from '~/mixins/Global'
import Form from '@/components/crud/Form'
import SimpleTable from '@/components/crud/SimpleTable'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration structurelle'
    }
  },
  components: {
    Form, SimpleTable
  },
  mixins: [Global],
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'structurals-configs'
    },
    ...mapState({
      departments(state) {
        return state.department.departments
      } 
    })
  },
  data() {
    return {
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Intitulé'
        }
      ],
      entity: {
        name: ''
      },
      fonctions: [
        {
          name: 'Finance'
        },
        {
          name: 'Departement'
        }
      ],
      headers: [
        {
          text: 'Intitulé',
          value: 'name',
          type: 'string'
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      loadDepartments: 'department/load'
    })
  },
  mounted() {
    this.loadDepartments()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>