<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-5">
        <div class="row w-100 mx-0">
          <div class="col-sm-3 mx-auto">
            <div class="auth-form-light text-left py-5 px-3 px-lg-4">
              <div class="brand-logo text-center">
                <img src="/images/logo-bcce.png" alt="Logo" />
              </div>

              <form class="pt-3" @submit.prevent="loginUser" autocomplete="on">
                <div class="form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Email"
                    autocomplete="on"
                    name="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control form-control-sm font-weight-300 font-size-13px"
                    placeholder="Mot de passe"
                    name="email"
                  />
                </div>

                <div class="mt-3 text-center">
                  <button
                    type="submit"
                    class="btn btn-info btn-sm py-2 px-3"
                    :class="{disabled: loading, 'btn-in-loading': loading}"
                    :disabled="loading"
                    >
                    <span v-if="loading">Chargement...</span>
                    <span v-else>CONNEXION</span>
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  <nuxt-link to="/forgot-password">Mot de passe oublié ?</nuxt-link>
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
import { mapState, mapActions }  from 'vuex'
import Account from '~/mixins/Account'
export default {
  mixins: [Account],
  components: {},
  props: {
  },
  layout: 'login',
  head() {
    return {
      title: 'Connexion'
    }
  },
  data (){
    return {
      form: {},
      loading: false
    }
  },
  methods: {
    async loginUser () {
      this.loading = true

      try {
        const response =  await this.$auth.loginWith('local', {
          data: this.form
        })

        if (response.data.state) {
          await this.loadInboxCourriers()
          this.$toast.success(response.message)
          this.$route.push('/')
        }else {
          this.$toast.error(response.data.message)
        }
      } catch (error) {
        const errorMessage = error.response.data.message
        this.$toast.error(errorMessage)
      }

      this.loading = false
    },
    ...mapActions({
      loadInboxCourriers: 'courrier/loadInboxCourriersAdmin'
    })
  }
}
</script>

<style>
  .font-size-20px {
    font-size: 15px !important;
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
  .btn-in-loading {
    cursor: not-allowed !important;
  }
</style>