<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Synthèse CRF</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div class="col">
                <button class="btn btn-light btn-sm mr-3">
                  <span class="typcn typcn-refresh"></span> Actualiser
                </button>

                <button class="btn btn-light btn-sm">
                  <span class="typcn typcn-chevron-left"></span>
                </button>
                <span>1/10</span>
                <button class="btn btn-light btn-sm">
                  <span class="typcn typcn-chevron-right"></span>
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
                    <th>Date</th>
                    <th>Initiateur</th>
                    <th>Objet</th>
                    <th>Monant</th>
                    <th>Devise</th>
                    <th>Rubrique</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in 10"
                    :key="i"
                  >
                    <td>{{ i }}</td>
                    <td>{{ formatDate('dd/MM/yyyy', new Date) }}</td>
                    <td>Emmanuel</td>
                    <td>Lorem ipsum dolor sit amet consectetur...</td>
                    <td>250</td>
                    <td>USD</td>
                    <td>Voyage</td>
                    <td>
                      <label
                        class="badge"
                        :class="{'badge-success': numberIsPair(randValue), 'badge-primary': !numberIsPair(randValue)}"
                      >
                          {{ !numberIsPair(randValue) ? 'Rejete' : 'Approuve' }}
                        </label>
                    </td>
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
import Global from '~/mixins/Global'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Synthese des requetes de fonds'
    }
  },
  mixins: [Global],
  data() {
    return {
      j: 1
    }
  },
  computed: {
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'synthesis-requests'
    },
    randValue() {
      return this.random(Math.random(),10)
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