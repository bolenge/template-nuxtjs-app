<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <p class="sidebar-menu-title">Menu</p>
          </li>

          <!-- Item Dashboard -->
          <li
            class="nav-item"
            :class="setPageActive('home')"
          >
            <nuxt-link class="nav-link" to="/">
              <em class="typcn typcn-device-desktop menu-icon"></em>
              <span class="menu-title">Accueil</span>
            </nuxt-link>
          </li>
          <!-- End item Dashboard -->

          <!-- Item config. systeme -->
          <li
            class="nav-item"
            :class="setPageActive('configs')"
          >
            <a class="nav-link" data-toggle="collapse" href="#configs" aria-expanded="false" aria-controls="configs">
              <em class="typcn typcn-cog menu-icon"></em>
              <span class="menu-title">Admin. Système</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="configs">
              <ul class="nav flex-column sub-menu">
                <!-- Nav item config. structurelle -->
                <li class="nav-item">
                  <nuxt-link
                    to="/configs/structurals"
                    class="nav-link"
                    :class="setNavLinkActive('structurals-configs')"
                  >
                    Config. Structurelle
                  </nuxt-link>
                </li>
                <!-- End nav item config. structurelle -->

                <!-- Nav item config. utilisateurs -->
                <li class="nav-item">
                  <nuxt-link
                    to="/configs/users"
                    class="nav-link"
                    :class="setNavLinkActive('users-configs')"
                  >
                    Config. Utilisateurs
                  </nuxt-link>
                </li>
                <!-- End nav item config. utilisateurs -->

                <!-- Nav item config. courriers -->
                <li class="nav-item">
                  <nuxt-link
                    to="/configs/courriers"
                    class="nav-link"
                    :class="setNavLinkActive('courriers-configs')"
                  >
                    Config. Courriers
                  </nuxt-link>
                </li>
                <!-- End nav item config. courriers -->

                <!-- Nav item config. finances -->
                <li class="nav-item">
                  <nuxt-link
                    to="/configs/finances"
                    class="nav-link"
                    :class="setNavLinkActive('finances-configs')"
                  >
                    Config. Finances
                  </nuxt-link>
                </li>
                <!-- End nav item config. finances -->
              </ul>
            </div>
          </li>
          <!-- End item config systeme -->

          <!-- Item Gestion courriers -->
          <li
            class="nav-item"
            :class="setPageActive('courriers')"
          >
            <a class="nav-link" data-toggle="collapse" href="#courriers" aria-expanded="false" aria-controls="courriers">
              <em class="typcn typcn-mail menu-icon"></em>
              <span class="menu-title">Gestion courriers</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="courriers">
              <ul class="nav flex-column sub-menu">
                <!-- Initiation courriers -->
                <li class="nav-item">
                  <nuxt-link
                    to="/courriers/init"
                    class="nav-link"
                    :class="setNavLinkActive('init-courriers')"
                  >
                    Initiation
                  </nuxt-link>
                </li>
                <!-- End Initiation courriers -->

                <!-- Boite de reception courriers -->
                <li class="nav-item">
                  <nuxt-link
                    to="/courriers/inbox"
                    class="nav-link"
                    :class="setNavLinkActive('inbox-courriers')"
                  >
                    Boite de reception
                    <span
                      v-if="countNewCourriers"
                      class="badge badge-primary p-1"
                    >
                      {{ countNewCourriers }}
                    </span>
                  </nuxt-link>
                </li>
                <!-- End Boite de reception courriers -->

                <!-- Archives courriers -->
                <li class="nav-item">
                  <nuxt-link
                    to="/courriers/archives"
                    class="nav-link"
                    :class="setNavLinkActive('archives-courriers')"
                  >
                    Archives
                  </nuxt-link>
                </li>
                <!-- End Archives courriers -->

                <!-- Synthèse Transmission courriers -->
                <li class="nav-item">
                  <nuxt-link
                    to="/courriers/synthesis-transmission"
                    class="nav-link"
                    :class="setNavLinkActive('synthesis-transmission-courriers')"
                  >
                    Synthèse Transmission
                  </nuxt-link>
                </li>
                <!-- End Synthèse Transmission courriers -->
              </ul>
            </div>
          </li>
          <!-- End item Gestion courriers -->

          <!-- Item Requête de fonds -->
          <li
            class="nav-item"
            :class="setPageActive('requests')"
          >
            <a class="nav-link" data-toggle="collapse" href="#requests" aria-expanded="false" aria-controls="requests">
              <em class="typcn typcn-film menu-icon"></em>
              <span class="menu-title">Requête de fonds</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="requests">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <nuxt-link
                    to="/requests/init"
                    class="nav-link"
                    :class="setNavLinkActive('init-requests')"
                  >
                    CRF
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    to="/requests/inbox"
                    class="nav-link"
                    :class="setNavLinkActive('inbox-requests')"
                  >
                    Mes requêtes
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    to="/requests/synthesis"
                    class="nav-link"
                    :class="setNavLinkActive('synthesis-requests')"
                  >
                    Synthese CRF
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- End item Requête de fonds -->

          <!-- Item ressources financiers -->
          <li
            class="nav-item"
            :class="setPageActive('finances')"
          >
            <a class="nav-link" data-toggle="collapse" href="#finances" aria-expanded="false" aria-controls="finances">
              <em class="typcn typcn-credit-card menu-icon"></em>
              <span class="menu-title">Ressources financières</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="finances">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                  <nuxt-link
                    to="/finances/collection"
                    class="nav-link"
                    :class="setNavLinkActive('collection-finances')"
                  >
                    Encaissement
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    to="/finances/transactions"
                    class="nav-link"
                    :class="setNavLinkActive('transactions-finances')"
                  >
                    Synthèse Transactions
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    to="/finances/synthesis"
                    class="nav-link"
                    :class="setNavLinkActive('synthesis-finances')"
                  >
                    Rapport Financier
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- End item ressources financieres -->

          <!-- Item Modifier mot de passe -->
          <li
            class="nav-item"
            :class="setPageActive('change-password')"
          >
            <nuxt-link class="nav-link" to="/account/change-password">
              <em class="typcn typcn-key menu-icon"></em>
              <span class="menu-title">Modifier mot de passe</span>
            </nuxt-link>
          </li>
          <!-- End Item Modifier mot de passe -->

          <!-- Item Deconnexion -->
          <li class="nav-item">
            <a class="nav-link cursor-click" @click.prevent="onLogout">
              <em class="typcn typcn-power menu-icon"></em>
              <span class="menu-title">Deconnexion</span>
            </a>
          </li>
          <!-- End Item Deconnexion -->
        </ul>
    </nav>
</template>

<script>
export default {
  props: {
    pageActive: {
      type: String,
      default: 'home'
    },
    navLinkActive: {
      type: String,
      default: ''
    },
    countNewCourriers: {
      type: Number,
      default: 0
    }
  },
  computed: {
  },
  methods: {
    setPageActive(page) {
      return this.pageActive == page ? 'active' : ''
    },
    setNavLinkActive(navLink) {
      return this.navLinkActive == navLink ? 'active' : ''
    },
    onLogout() {
      this.$swal({
        title: "Déconnxion",
        text: "Voulez-vous vraiment vous déconnecter ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showCancelButton: true
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          this.$auth.logout()
        }
      });
    }
  }
}
</script>

<style>
  .cursor-click {
    cursor: pointer !important;
  }
</style>