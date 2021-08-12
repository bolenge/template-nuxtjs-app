<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="config-banks-tab" data-toggle="tab" href="#config-banks" role="tab" aria-controls="config-banks" aria-selected="true"><span class="typcn typcn-credit-card"></span> Comptes Bancaires</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="config-caisses-tab" data-toggle="tab" href="#config-caisses" role="tab" aria-controls="config-caisses" aria-selected="false"><sapn class="typcn typcn-document-text"></sapn> Comptes Petites Caisses</a>
        </li>
        <!-- Tab config rubriques -->
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="config-tags-tab" data-toggle="tab" href="#config-tags" role="tab" aria-controls="config-tags" aria-selected="false"><sapn class="typcn typcn-tags"></sapn> Rubriques</a>
        </li>
        <!-- End Tab config rubriques -->
      </ul>
    </div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="config-banks" role="tabpanel" aria-labelledby="config-banks-tab">
        <h2 class="title mb-4"><span class="typcn typcn-credit-card"></span> Configuration comptes bancaires</h2>

        <div class="row">
          <div class="col-md-4 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title text-normal">Creation compte</h4>

                <form class="forms-sample">
                  <div class="form-group">
                    <label for="bank">Nom de la banque <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="bank" required />
                  </div>

                  <div class="form-group">
                    <label for="account_number">Nº Compte <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="account_number" required />
                  </div>

                  <div class="form-group">
                    <label for="account_number">Nom proprietaire compte <span class="text-danger">*</span></label>
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
                <h4 class="card-title text-normal">Liste de departements</h4>

                <div class="table-responsive">
                  <table class="table table-hover" aria-describedby="">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Banque</th>
                        <th>Nº Compte</th>
                        <th>Nom proprietaire compte</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in 2" :key="i">
                        <td>{{ i }}</td>
                        <td>Equity</td>
                        <td>3847-8377-0393-3847</td>
                        <td>Mabiala Matondo</td>
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

      <!-- Tab config petites caisses -->
      <div class="tab-pane fade" id="config-caisses" role="tabpanel" aria-labelledby="config-caisses-tab">
        <h1 class="title mb-4"><sapn class="typcn typcn-document-text"></sapn> Configuration Petites Caisses</h1>

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
      <!-- End Tab config petites caisses -->

      <!-- Tab config Rubriquess -->
      <div class="tab-pane fade" id="config-tags" role="tabpanel" aria-labelledby="config-tags-tab">
        <h1 class="title mb-4">
          <sapn class="typcn typcn-tags"></sapn> Configuration Rubriques
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
export default {
  head() {
    return {
      title: 'Configuration finances'
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>