<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <div class="d-flex sidebar-profile">
              <div class="sidebar-profile-image">
                <img src="images/faces/face29.png" alt="image">
                <span class="sidebar-status-indicator"></span>
              </div>
              <div class="sidebar-profile-name">
                <p class="sidebar-name">
                  Don de Dieu Bolenge
                </p>
                <p class="sidebar-designation">
                  En ligne
                </p>
              </div>
            </div>
            <p class="sidebar-menu-title">Menu</p>
          </li>

          <!-- Item Dashboard -->
          <li class="nav-item active">
            <nuxt-link class="nav-link" to="/">
              <i class="typcn typcn-device-desktop menu-icon"></i>
              <span class="menu-title">Accueil</span>
            </nuxt-link>
          </li>
          <!-- End item Dashboard -->

          <!-- Item config. systeme -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#configs" aria-expanded="false" aria-controls="configs">
              <i class="typcn typcn-cog menu-icon"></i>
              <span class="menu-title">Config. système</span>
              <i class="typcn typcn-chevron-right menu-arrow"></i>
            </a>
            <div class="collapse" id="configs">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/users">Config. utilisateurs</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/courriers">Config. courrier</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/finance">Config. finance</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/direction">Config. direction</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item config systeme -->

          <!-- Item Gestion courriers -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#courriers" aria-expanded="false" aria-controls="courriers">
              <i class="typcn typcn-mail menu-icon"></i>
              <span class="menu-title">Gestion courriers</span>
              <i class="typcn typcn-chevron-right menu-arrow"></i>
            </a>
            <div class="collapse" id="courriers">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/init">Initier</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/archives">Archives</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/inbox">Boite de reception</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item Gestion courriers -->

          <!-- Item Requête de fonds -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#requests" aria-expanded="false" aria-controls="requests">
              <i class="typcn typcn-film menu-icon"></i>
              <span class="menu-title">Requête de fonds</span>
              <i class="typcn typcn-chevron-right menu-arrow"></i>
            </a>
            <div class="collapse" id="requests">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/init">Initier</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/archives">Mes requêtes</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/inbox">Boite de reception</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item Requête de fonds -->

          <!-- Item ressources financiers -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#finances" aria-expanded="false" aria-controls="finances">
              <i class="typcn typcn-credit-card menu-icon"></i>
              <span class="menu-title">Ressources financiers</span>
              <i class="typcn typcn-chevron-right menu-arrow"></i>
            </a>
            <div class="collapse" id="finances">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/collection">Encaissement</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/disbursement">Décaissement</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/synthesis">Synthèse transactions</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item ressources financiers -->
        </ul>
    </nav>
</template>

<script>
export default {
  
}
</script>