<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="config-departments-tab" data-toggle="tab" href="#config-departments" role="tab" aria-controls="config-departments" aria-selected="true"><span class="typcn typcn-home-outline"></span> Configuration Departements</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="config-fonction-tab" data-toggle="tab" href="#config-fonction" role="tab" aria-controls="config-fonction" aria-selected="false"><sapn class="typcn typcn-puzzle-outline"></sapn> Configuration Fonctions</a>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="config-departments" role="tabpanel" aria-labelledby="config-departments-tab">
        <h2 class="title mb-4"><span class="typcn typcn-home-outline"></span> Configuration Departements</h2>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Création de departement</h4>

                <form class="forms-sample">
                  <div class="form-group">
                    <label for="name">Intitulé <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="name" required />
                  </div>
                  <button type="submit" class="btn btn-info mr-2">Enregistrer</button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-8 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Liste de departements</h4>

                <div class="table-responsive">
                  <table class="table table-hover" aria-describedby="">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Libellé</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 2" :key="i">
                        <td>{{ i }}</td>
                        <td>Finance</td>
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
      <div class="tab-pane fade" id="config-fonction" role="tabpanel" aria-labelledby="config-fonction-tab">
        <h1><span class="typcn typcn-puzzle-outline"></span> Configuration Fonctions</h1>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Création de fonction</h4>

                <form class="forms-sample">
                  <div class="form-group">
                    <label for="name">Intitulé <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="name" required />
                  </div>
                  <button type="submit" class="btn btn-info mr-2">Enregistrer</button>
                </form>
              </div>
            </div>
          </div>
          
          <div class="col-lg-8 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Liste de fonctions</h4>

                <div class="table-responsive">
                  <table class="table table-hover" aria-describedby="">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Libellé</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 2" :key="i">
                        <td>{{ i }}</td>
                        <td>Directrice de bureau</td>
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
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration directions'
    }
  },
  mixins: [Global],
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'directions-configs'
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