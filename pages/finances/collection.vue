<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-credit-card"></span> Encaissement de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
                <!-- Field source -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="source">Source <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="source" required/>
                  </div>
                </div>
                <!-- End Field source -->

              <!-- Field currency -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="currency">Devise <span class="text-danger">*</span></label>
                    <select class="form-control" id="currency" required style="height: 39px;">
                      <option value="M">USD</option>
                      <option value="F">CDF</option>
                    </select>
                  </div>
                </div>
                <!-- End Field currency -->

                <!-- Field amount -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="amount">Montant <span class="text-danger">*</span></label>
                    <input type="number" class="form-control form-control-sm" id="amount" required/>
                  </div>
                </div>
                <!-- End Field amount -->

                <!-- Field rubrique -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="rubrique">Rubrique <span class="text-danger">*</span></label>
                    <select
                      class="form-control"
                      id="rubrique"
                      equired
                      style="height: 39px;"
                    >
                      <option value="1">Voyage</option>
                      <option value="2">Vacances</option>
                    </select>
                  </div>
                </div>
                <!-- End Field rubrique -->

                <!-- Field type_account -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="type_account">Type Compte a approvionner <span class="text-danger">*</span></label>
                    <select
                      v-model="form.type_account"
                      class="form-control"
                      id="type_account"
                      equired
                      style="height: 39px;"
                    >
                      <option value="1">Compte bancaire</option>
                      <option value="2">Petites caisses</option>
                    </select>
                  </div>
                </div>
                <!-- End Field type_account -->

                <!-- Field receiver -->
                <div v-if="form.type_account == '1'" class="col-lg-6">
                  <div class="form-group">
                    <label for="receiver">Compte approvionne <span class="text-danger">*</span></label>
                    <select class="form-control" id="receiver" required style="height: 39px;">
                      <option value="M">Rawbank - 8765-8387-9903-9876</option>
                      <option value="M">Rawbank - 8765-8387-9903-9876</option>
                    </select>
                  </div>
                </div>
                <!-- End Field receiver -->
              </div>
              
              <div class="text-center">
                <button type="submit" class="btn btn-info"><span class="typcn typcn-input-checked"></span> Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <script src="/js/file-upload.js"></script>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'Initiation d\'un courrier'
    }
  },
  data() {
    return {
      form: {
        type_account: 1
      }
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>