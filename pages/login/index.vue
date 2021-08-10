<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-5">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo text-center">
                <img src="/images/one-touch-logo.png" alt="Logo" />
              </div>

              <form class="pt-3">
                <div class="form-group">
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" />
                </div>

                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input border-info">
                      Garder ma session active.
                      <em class="input-helper"></em>
                    </label>
                  </div>
                </div>

                <div class="mt-3">
                  <button class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn">CONNEXION</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  <nuxt-link to="/forgot-password">Mot de passe oublié ?</nuxt-link>
                </div>
              </form>
            </div>

            <div class="text-center py-5">
              <p class="font-size-20px">Powered by <strong><a href="https://mtechinteractives.com">Mtech Interactives</a></strong></p>
            </div>
          </div>
        </div>
        
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
export default {
  layout: 'login',
  head() {
    return {
      title: 'Connexion'
    }
  }
}
</script>

<style>
  .font-size-20px {
    font-size: 17px !important;
  }
  .input-helper::before {
    border-color: #2b80ff !important;
  }
  .form-check .form-check-label input[type="checkbox"]:checked + .input-helper:before {
    background: #2b80ff;
    border-width: 0;
  }

  .form-check .form-check-label input[type="checkbox"] + .input-helper:before {
    border-color: #2b80ff !important;
  }
</style>