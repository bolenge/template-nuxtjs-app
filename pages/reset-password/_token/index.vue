<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-5">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">

              <h4>Changer de mot de passe</h4>
              <h6 class="font-weight-light">Saisissez un nouveau mot de passe</h6>

              <form class="pt-3">
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Email" />
                </div>

                <div class="form-group">
                  <input type="password" class="form-control" placeholder="Nouveau mot de passe" />
                </div>

                <div class="form-group">
                  <input type="password" name="password_confirmation" class="form-control" placeholder="Confirmer mot de passe" />
                </div>

                <div class="mt-3">
                  <button class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn">ENREGISTRER</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  <nuxt-link to="/login"><em class="typcn typcn-arrow-left"></em> Je veux me connecter.</nuxt-link>
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
      title: 'Changement de mot de passe'
    }
  },
  data () {
    return {
      slug: this.$route.params.token
    }
  },
  mounted () {
    console.log(this.slug)
  }
}
</script>

<style>
  .font-size-20px {
    font-size: 17px !important;
  }
</style>