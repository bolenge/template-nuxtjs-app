<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-mail"></span> Initiation d'un courrier</h2>
    </div>

    <div class="row">
      <div class="col-lg-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
              <!-- Field type -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="type">Type de courrier <span class="text-danger">*</span></label>
                    <select class="form-control" id="type" required style="height: 39px;">
                      <option value="M">Entrant</option>
                      <option value="F">Sortant</option>
                    </select>
                  </div>
                </div>
                <!-- End Field type -->

                <!-- Field code -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="code">Code courrier (<small>Généré automatiquement</small>) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="code" required/>
                  </div>
                </div>
                <!-- End Field code -->

                <!-- Field sender -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="sender">Expediteur <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="sender" required/>
                  </div>
                </div>
                <!-- End Field sender -->

                <!-- Field receiver -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="receiver">Destinataire <span class="text-danger">*</span></label>
                    <select class="form-control" id="receiver" required style="height: 39px;">
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                </div>
                <!-- End Field receiver -->

                <!-- Field file scanned -->
                <div class="col-lg-12">
                  <div class="form-group">
                      <label>Uploader le fichier scanner ici</label>
                      <input type="file" name="img[]" class="file-upload-default">
                      <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload fichier">
                        <span class="input-group-append">
                          <button class="file-upload-browse btn btn-light" type="button">Choisir le fichier</button>
                        </span>
                      </div>
                    </div>
                </div>
                <!-- End Field file scanned -->
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
export default {
  head() {
    return {
      title: 'Initiation d\'un courrier'
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>