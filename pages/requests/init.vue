<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-film"></span> Initiation de requete de fonds</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
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

                <!-- Field rubrique -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="rubrique">Rubrique <span class="text-danger">*</span></label>
                    <select class="form-control" id="rubrique" required style="height: 39px;">
                      <option value="M">Voyage</option>
                      <option value="F">Conge</option>
                    </select>
                  </div>
                </div>
                <!-- End Field rubrique -->

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

                <!-- Field file soubassement -->
                <div class="col-lg-12">
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
export default {
  head() {
    return {
      title: 'Initiation d\'une requete de fonds'
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>