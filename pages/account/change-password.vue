<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex px-5">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="card text-left py-5 px-4 px-sm-4">

              <div class="text-center">
                <h4>Changer Mot de Passe</h4>
                <h6 class="font-weight-light">Saisissez un nouveau mot de passe</h6>
              </div>

              <form class="pt-3" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-sm font-size-13px"
                    placeholder="Email"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control form-control-sm font-size-13px"
                    placeholder="Nouveau mot de passe"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="form-control"
                    placeholder="Confirmer mot de passe"
                    required="required"
                  />
                </div>

                <div class="mt-3 text-center">
                  <button
                    type="submit"
                    class="btn btn-info btn-sm"
                  >
                    <span v-if="loading">Chargement...</span>
                    <span v-else>ENREGISTRER</span>
                  </button>
                </div>
              </form>
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
import Global from '~/mixins/Global'
export default {
  layout: 'default',
  middleware: 'auth',
  head() {
    return {
      title: 'Changement de mot de passe'
    }
  },
  mixins: [Global],
  data () {
    return {
      form: {},
      loading: false
    }
  },
  computed: {
    currentPage() {
      return 'change-password'
    },
  },
  methods: {
    ...mapActions({
      changePassword: 'user/changePassword'
    }),
    async onSubmit() {
      this.loading = true

      try {
        await this.changePassword({ entity: this.form })

        this.$swal({
          title: "Mot de passe modifié avec succès.",
          text: "Vous serez déconnecter, pour vous connecter avec votre nouveau mot de passe.",
          icon: "success",
          buttons: true,
          confirmButtonText: 'Ok'
        }).then(({isConfirmed}) => {
          this.$toast.info('Veuillez vous connecter avec le nouveau mot de passe.')
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