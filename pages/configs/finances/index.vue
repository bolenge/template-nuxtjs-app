<template>
  <div class="content-wrapper">
    <div class="container-fluid text-center mb-4">
      <div class="col-8 offset-lg-2">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="config-banks-tab" data-toggle="tab" href="#config-banks" role="tab" aria-controls="config-banks" aria-selected="true"><span class="typcn typcn-credit-card"></span> Comptes Bancaires</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="config-caisses-tab" data-toggle="tab" href="#config-caisses" role="tab" aria-controls="config-caisses" aria-selected="false"><span class="typcn typcn-document-text"></span> Comptes Caisses</a>
          </li>
          <!-- Tab config rubriques -->
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="config-tags-tab" data-toggle="tab" href="#config-tags" role="tab" aria-controls="config-tags" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Opérations</a>
          </li>
          <!-- End Tab config rubriques -->
        </ul>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="config-banks" role="tabpanel" aria-labelledby="config-banks-tab">
        <ConfigAccountBank />
      </div>

      <!-- Tab config caisses -->
      <div class="tab-pane fade" id="config-caisses" role="tabpanel" aria-labelledby="config-caisses-tab">
        <h1 class="title mb-4"><span class="typcn typcn-document-text"></span> Configuration Caisses</h1>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Création compte caisse</h4>

                <form class="forms-sample">
                  <div class="form-group">
                    <label for="bank">Intitulé compte <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="bank" required />
                  </div>

                  <div class="form-group">
                    <label for="account_number">Nº Compte <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="account_number" required />
                  </div>

                  <button type="submit" class="btn btn-info mr-2">Enregistrer</button>
                </form>
              </div>
            </div>
          </div>
          
          <div class="col-lg-8 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Liste de comptes</h4>

                <div class="table-responsive">
                  <table class="table table-hover" aria-describedby="">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Intitulé Compte</th>
                        <th>Nª Compte</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 2" :key="i">
                        <td>{{ i }}</td>
                        <td>Frais besoins</td>
                        <td>C-0015</td>
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
      <!-- End Tab config caisses -->

      <!-- Tab config Rubriquess -->
      <div class="tab-pane fade" id="config-tags" role="tabpanel" aria-labelledby="config-tags-tab">
        <h1 class="title mb-4">
          <span class="typcn typcn-tags"></span> Configuration Rubriques
        </h1>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Création rubrique</h4>

                <form class="forms-sample">
                  <div class="form-group">
                    <label for="name">Intitulé rubrique<span class="text-danger">*</span></label>
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
                <h4 class="card-title text-normal">Liste de rubriques</h4>

                <div class="table-responsive">
                  <table class="table table-hover" aria-describedby="">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Intitulé</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 2" :key="i">
                        <td>{{ i }}</td>
                        <td>Voyages</td>
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
import ConfigAccountBank from '~/components/configs/finances/ConfigAccountBank'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration finances'
    }
  },
  mixins: [Global],
  components: {
    ConfigAccountBank
  },
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'finances-configs'
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
  .nav-tabs .nav-item .nav-link {
    border-top: 2.5px solid #0063f7 !important;
  }
  .nav-tabs .nav-item .nav-link.active {
    background-color: #0063f7 !important;
    color: #fff !important;
  }
</style>