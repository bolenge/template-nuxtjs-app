<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-credit-card"></span> Rapport financier</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div class="col">
                <button class="btn btn-success btn-sm mr-3">
                  <span class="typcn typcn-refresh"></span> Actualiser
                </button>

                <button class="btn btn-info btn-sm ml-3">
                  <span class="typcn typcn-database"></span> Extraction donnees
                </button>
              </div>
              <div class="form-group col">
                <div class="input-group">
                  <input type="text" class="form-control form-control-sm py-2" placeholder="Recherche..." aria-label="Search">
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-light" type="button"><span class="typcn typcn-zoom"></span></button>
                  </div>
                </div>
              </div>
            </div>
            
            

            <div class="table-responsive">
              <table class="table table-hover" aria-describedby="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type opération</th>
                    <th>Op. en attente</th>
                    <th>Op. declinées</th>
                    <th>Op. approuvées</th>
                    <th>Nombre de personnes</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in 2"
                    :key="i"
                  >
                    <td>{{ i }}</td>
                    <td>{{ i === 1 ? 'Décaissement' : 'Encaissement' }}</td>
                    <td>20</td>
                    <td>13</td>
                    <td>6</td>
                    <td>49</td>
                    <td>49 000 USD</td>
                    <td>
                      <button class="btn btn-sm btn-info">
                        <span class="typcn typcn-eye-outline"></span>
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
export default {
  head() {
    return {
      title: 'Synthese des requetes de fonds'
    }
  },
  data() {
    return {
      j: 1
    }
  },
  computed: {
    randValue() {
      return this.random(Math.random(),10)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>