<template>
  <div class="content-wrapper">
    <div class="row mb-4">
      <div class="col-lg-8 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body text-center p-5">
            <h1 class="my-4 mb-5">Bienvenu(e) sur {{ APP_NAME }} Application</h1>

            <div class="p-5">
              <img src="images/one-touch-logo.png" alt="Logo de One touch" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body text-center p-5">
            <div class="mb-4">
              <h5>{{ userConnected.name }}</h5>
              <img
                :src="currentUserAvatar ? `${BASE_PATH_USER_PICTURES}/${currentUserAvatar}` : DEFAULT_USER_AVATAR"
                alt="Current user avatar"
                class="user-home-avatar"
              />
            </div>

            <div class="row">
              <div class="col-lg-6 my-3">
                <h5>Date</h5>
                <span>Le {{ currentDate }} </span>
              </div>

              <div class="col-lg-6 my-3">
                <h5>Heure Login</h5>
                <span>{{ getUserMomentLogged }} </span>
              </div>

              <div class="col-lg-6 my-3">
                <h5>Departement</h5>
                <span>{{ currentAdmin.department ? currentAdmin.department.name : '---' }}</span>
              </div>

              <div class="col-lg-6 my-3">
                <h5>Role</h5>
                <span>{{ userConnected.role.name }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="profile-user" class="btn btn-info d-flex text-center btn-sm">
                <span v-if="loadingUpdateAvatar" class="col-12">Chargement...</span>
                <span v-else>
                  <span class="mdi mdi-camera col-1 text-right"></span>
                  <span class="col-11">Changer Photo Profile</span>
                </span>
              </label>

              <input
                type="file"
                name="media[]"
                class="file-upload-default"
                id="profile-user"
                @change="updateAvatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Courriers</h4>

            <div class="container p-5">
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Requêtes de fonds</h4>

            <div class="container p-5">
              <canvas id="doughnutChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from 'jquery'
import Chart from 'chart.js/auto'
import format from 'date-format'
import Account from '~/mixins/Account'
import Global from '~/mixins/Global'

export default {
  middleware: 'auth',
  mixins: [Account,Global],
  data() {
    return {
      loadingUpdateAvatar: false,
      doughnutPieOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    }
  },
  computed: {
    ...mapState({
      stats(state) {
        return state.admin.stats
      },
      statsCourriers() {
        return this.stats.courriers
      },
      statsFundRequests() {
        return this.stats.fund_requests
      },
    }),
    currentDate() {
      return format('dd/MM/yyyy')
    },
    currentPage() {
      return 'home'
    }
  },
  watch: {
    statsFundRequests() {
      this.loadFundRequestsChart()
    },
    statsCourriers() {
      this.loadCourriersChart()
    },
  },
  mounted () {
    this.loadStats()
  },
  methods: {
    ...mapActions({
      loadStats: 'admin/loadCurrentStatsCourriersAndFundRequests'
    }),
    updateAvatar(e) {
      this.loadingUpdateAvatar = true

      try {
        const formData = new FormData();
        const imagefile = e.target;

        formData.append("media", imagefile.files[0]);

        this.$axios.post('/auth/update-user-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(({ data }) => {
          if (data.state) {
            this.$toast.success(data.message)
            window.location.reload()
          }else {
            this.$toast.error(data.message)
          }
        })
      } catch (error) {
        this.$toast.error('Une erreur est survenue lors de l\'upload, réessayez svp !')
      } finally {
        this.loadingUpdateAvatar = false
      }

      
    },
    loadCourriersChart() {
      if ($("#pieChart").length) {
        if (this.statsCourriers) {
          var doughnutPieData = {
            datasets: [{
              data: [
                this.statsCourriers.received,
                this.statsCourriers.sent,
                this.statsCourriers.news,
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255,99,132,1)',
                'rgba(255, 159, 64, 1)'
              ],
            }],
            labels: [
              'Reçus : '+this.statsCourriers.received,
              'Envoyés : '+this.statsCourriers.sent,
              'Nouveaux : '+this.statsCourriers.news,
            ]
          };
        }

        const pieChartCanvas = $("#pieChart").get(0).getContext("2d");

        try {
          new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: this.doughnutPieOptions
          });
        } catch (error) {
          
        }
      }
    },
    loadFundRequestsChart() {
      if ($("#doughnutChart").length) {
        if (this.statsFundRequests) {
          const dataRequestsFund = {
            datasets: [{
              data: [
                this.statsFundRequests.initiated,
                this.statsFundRequests.conform,
                this.statsFundRequests.unconform,
                this.statsFundRequests.approved,
                this.statsFundRequests.rejected,
                this.statsFundRequests.executed,
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(149, 241, 149, 0.5)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255,99,132,1)',
                'rgba(149, 241, 149, 1)'
              ],
            }],
            labels: [
              'Initiées : '+this.statsFundRequests.initiated,
              'Conformes : '+this.statsFundRequests.conform,
              'Non conformes : '+this.statsFundRequests.unconform,
              'Approuvées : '+this.statsFundRequests.approved,
              'Rejetées : '+this.statsFundRequests.rejected,
              'Exécutées : '+this.statsFundRequests.executed
            ]
          };

          const doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
          
          try {
            new Chart(doughnutChartCanvas, {
              type: 'doughnut',
              data: dataRequestsFund,
              options: this.doughnutPieOptions
            });
          } catch (error) {
            
          }
        }
      }
    }
  }
}
</script>

<style>
  .user-home-avatar {
    width: 90px;
    border-radius: 4px;
  }
</style>