<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-mail"></span> Archives Courriers</h2>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div class="col-lg-5">
                <nuxt-link to="/courriers/init" class="btn btn-info btn-sm">
                  <span class="typcn typcn-plus"></span> Initiation
                </nuxt-link>

                <button class="btn btn-success btn-sm mx-lg-3">
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
              <div class="form-group col-lg-3 d-flex">
                <label for="type" class="mr-3 mt-2">Filtrer par </label>
                <select name="type" id="" class="form-control py-2 col-lg-8" style="height: 37px;">
                  <option value="">Type de courrier</option>
                  <option value="">Courrier entrant</option>
                  <option value="">Courrier sortant</option>
                </select>
              </div>
              <div class="form-group col-lg-4">
                <div class="input-group">
                  <input type="text" class="form-control form-control-sm py-2" placeholder="Tapez quelque chose..." aria-label="Search">
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
                    <th>Type</th>
                    <th>Code</th>
                    <th>Initiateur</th>
                    <th>Expediteur</th>
                    <th>Destinataire</th>
                    <th>Piece</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in 10"
                    :key="i"
                    :class="{'bg-light': !numberIsPair(randValue), 'font-weight-bold': !numberIsPair(randValue)}"
                  >
                    <td>{{ i }}</td>
                    <td>{{ formatDate('dd/MM/yyyy', new Date) }}</td>
                    <td>Entrant</td>
                    <td>C-ENTRY-079-ONE</td>
                    <td>Emmanuel</td>
                    <td>Bob</td>
                    <td>Don</td>
                    <td>
                      <label class="badge badge-info"><span class="typcn typcn-attachment"></span></label>
                    </td>
                    <td>
                      <label
                        class="badge"
                        :class="{'badge-light': numberIsPair(random(i,10)), 'badge-primary': !numberIsPair(random(i,10))}"
                      >
                          {{ !numberIsPair(random(i,10)) ? 'Urgent' : 'Normal' }}
                        </label>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-info">
                        <span class="typcn typcn-pencil"></span>
                      </button>
                      <button class="btn btn-sm btn-danger">
                        <span class="typcn typcn-trash"></span>
                      </button>
                      <button v-if="numberIsPair(randValue)" class="btn btn-sm btn-success">
                        <span class="typcn typcn-arrow-forward-outline"></span>
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
      title: 'Archives de courriers'
    }
  },
  mixins: [Global],
  data () {
    return {
      randValue: 1
    }
  },
  computed: {
    currentPage() {
      return 'courriers'
    },
    currentNavLink() {
      return 'archives-courriers'
    },
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>