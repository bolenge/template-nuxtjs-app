<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Initiation de requêtes de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
              <!-- Field initiator -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="initiator">Initié par <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control form-control-sm disabled"
                      id="initiator"
                      disabled
                      :value="userConnected.name"
                    />
                  </div>
                </div>
                <!-- End Field initiator -->

                 <!-- Field date_request -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="date_request">Date de la demande <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      :value="currentDate"
                      class="form-control form-control-sm disabled"
                      id="date_request"
                      disabled
                    />
                  </div>
                </div>
                <!-- End Field date_request -->

                <!-- Field object -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="object">Objet de la demande <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="object" required/>
                  </div>
                </div>
                <!-- End Field object -->

                <!-- Field amount -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="amount">Montant <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="amount" required/>
                  </div>
                </div>
                <!-- End Field amount -->

                <!-- Field currency -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="currency">Devise <span class="text-danger">*</span></label>
                    <select class="form-control" id="currency" required style="height: 39px;">
                      <option value="M">USD</option>
                      <option value="F">FC</option>
                    </select>
                  </div>
                </div>
                <!-- End Field currency -->

                <!-- Field file soubassement -->
                <div class="col-lg-6">
                  <div class="form-group">
                      <label>Uploader soubassements Administratifs</label>
                      <input type="file" name="img[]" class="file-upload-default">
                      <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload fichier">
                        <span class="input-group-append">
                          <button class="file-upload-browse btn btn-light" type="button">Choisir le fichier</button>
                        </span>
                      </div>
                    </div>
                </div>
                <!-- End Field file soubassement -->

                <!-- Field use_date -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="use_date">Date d'utilisattion <span class="text-danger">*</span></label>
                    <input type="date" class="form-control form-control-sm" id="use_date" required/>
                  </div>
                </div>
                <!-- End Field use_date -->

                <!-- Field data_delivry_support -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="data_delivry_support">Date Remise Pièces Justificatives <span class="text-danger">*</span></label>
                    <input type="date" class="form-control form-control-sm" id="data_delivry_support" required/>
                  </div>
                </div>
                <!-- End Field data_delivry_support -->
              </div>
              
              <div class="text-center">
                <button type="submit" class="btn btn-info"><span class="typcn typcn-input-checked"></span> Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import Account from '~/mixins/Account'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Initiation d\'une requete de fonds'
    }
  },
  mixins: [Account,Global],
  data () {
    return {
    }
  },
  computed: {
    currentPage() {
      return 'requests'
    },
    currentNavLink() {
      return 'init-requests'
    },
    currentDate() {
      return this.formatDate('dd/MM/yyyy', new Date)
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>