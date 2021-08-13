<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h2 class="title mb-4"><span class="typcn typcn-user-outline"></span> Configuration utilisateurs</h2>
    </div>

    <div class="row">
      <div class="offset-lg-2 col-lg-8 mb-3">
        <div class="d-block">
          <nuxt-link class="btn btn-info btn-sm float-left" to="/configs/users">&#8592; Retour</nuxt-link>
        </div>
      </div>
      <div class="col-lg-8 offset-lg-2 grid-margin stretch-card">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title text-normal text-center">Creation d'un nouvel utilisateur</h4>
          </div>

          <div class="card-body">
            <form class="forms-sample">
              <div class="row">
                <!-- Field lastname -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="lastname">Nom <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="lastname" required/>
                  </div>
                </div>
                <!-- End Field lastname -->

                <!-- Field firstname -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="firstname">Prenom <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="firstname" required/>
                  </div>
                </div>
                <!-- End Field firstname -->

                <!-- Field email -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="email">Email <span class="text-danger">*</span></label>
                    <input type="email" class="form-control form-control-sm" id="email" required/>
                  </div>
                </div>
                <!-- End Field email -->

                <!-- Field phone -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="phone">Telephone <span class="text-danger">*</span></label>
                    <input type="tel" class="form-control form-control-sm" id="phone" required/>
                  </div>
                </div>
                <!-- End Field phone -->

                <!-- Field gender -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="gender">Sexe <span class="text-danger">*</span></label>
                    <select class="form-control" id="gender" required>
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                </div>
                <!-- End Field gender -->

                <!-- Field role -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="role">Role <span class="text-danger">*</span></label>
                    <select class="form-control" id="role" required>
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                </div>
                <!-- End Field role -->

                <!-- Field department -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="department">Departement <span class="text-danger">*</span></label>
                    <select class="form-control" id="department" required>
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                </div>
                <!-- End Field department -->

                <!-- Field fonction -->
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="fonction">Fonction <span class="text-danger">*</span></label>
                    <select class="form-control" id="fonction" required>
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </select>
                  </div>
                </div>
                <!-- End Field fonction -->
              </div>
              <div class="form-check form-check-flat form-check-primary">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input">
                  Remember me
                </label>
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
      title: 'Creation d\'un nouvel utilisateur'
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>