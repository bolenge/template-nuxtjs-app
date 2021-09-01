<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-5">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">

             <div class="text-center">
                <h4>Mot de passe oublié</h4>
                <h6 class="font-weight-light">Saisissez votre email pour réinitialiser votre mot de passe</h6>
             </div>

              <form class="pt-3" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Email"
                  />
                </div>

                <div class="mt-3 text-center">
                  <button class="btn btn-info btn-sm py-2 px-3">
                    <span v-if="loading">Chargement...</span>
                    <span v-else>ENVOYER</span>
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
  watch: {
  },
  layout: 'login',
  head() {
    return {
      title: 'Mot de passe oublié'
    }
  },
  data () {
    return {
      form: {},
      loading: false
    }
  },
  methods: {
    ...mapActions({
      forgotPassword: 'user/forgotPassword'
    }),
    async onSubmit() {
      this.loading = true

      try {
        await this.forgotPassword({ entity: this.form })

        this.$swal({
          title: "Opération effectuée avec succès.",
          text: "Un mail vous est envoyé pour réinitialiser votre mot de passe.",
          icon: "success",
          buttons: true,
          confirmButtonText: 'Ok'
        }).then(({isConfirmed}) => {
          this.$auth.logout()
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