<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-5">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">

              <h4>Changer de mot de passe</h4>
              <h6 class="font-weight-light">Saisissez un nouveau mot de passe</h6>

              <form class="pt-3" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Email"
                  />
                </div>

                <div class="form-group">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Nouveau mot de passe"
                  />
                </div>

                <div class="form-group">
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    name="password_confirmation"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Confirmer mot de passe"
                  />
                </div>

                <div class="mt-3 text-center">
                  <button
                    type="submiy"
                    class="btn btn-info btn-sm py-2 px-3"
                  >
                    <span v-if="loading">Chargement...</span>
                    <span v-else>ENREGISTRER</span>
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  <nuxt-link to="/login"><em class="typcn typcn-arrow-left"></em> Je veux me connecter.</nuxt-link>
                </div>
              </form>
            </div>

            <div class="text-center py-5">
              <p class="font-size-20px font-weight-300">Powered by <strong><a href="https://mtechinteractives.com">Mtech Interactives</a></strong></p>
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
import { mapActions } from "vuex";
export default {
  layout: 'login',
  head() {
    return {
      title: 'Changement de mot de passe'
    }
  },
  data () {
    return {
      slug: this.$route.params.token,
      form: {},
      loading: false
    }
  },
  mounted () {
    this.form.token = this.slug

    window.stop()
  },
  methods: {
    ...mapActions({
      resetPassword: 'user/resetPassword'
    }),
    async onSubmit() {
      this.loading = true

      try {
        await this.resetPassword({ entity: this.form })

        this.$swal({
          title: "Opération réussie.",
          text: "Un mail vous est envoyé avec votre nouveau mot de passe.",
          icon: "success",
          buttons: true,
          confirmButtonText: 'Ok'
        }).then(({isConfirmed}) => {
          this.$toast.info('Veuillez vous connecter avec le nouveau mot de passe.')
          this.$router.replace('/login')
        });

      } catch (error) {
        if (error.response && (error.response.status === 422 || error.response.status === 401)) {
          if (error.response.data) {
            const data = error.response.data
            
            this.$swal({
              title: "Erreur",
              text: data.message,
              icon: "warning",
              buttons: true,
              confirmButtonText: 'Ok'
            })
          }else {
            this.$toast.error('Une erreur est survenue, réessayez svp !')
          }
        }else {
          this.$toast.error('Une erreur est survenue, réessayez svp !')
        }
        
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .font-size-20px {
    font-size: 17px !important;
  }
</style>