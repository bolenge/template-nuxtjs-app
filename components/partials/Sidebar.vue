<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <p class="sidebar-menu-title">Menu</p>
          </li>

          <!-- Item Dashboard -->
          <li class="nav-item active">
            <nuxt-link class="nav-link" to="/">
              <em class="typcn typcn-device-desktop menu-icon"></em>
              <span class="menu-title">Accueil</span>
            </nuxt-link>
          </li>
          <!-- End item Dashboard -->

          <!-- Item config. systeme -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#configs" aria-expanded="false" aria-controls="configs">
              <em class="typcn typcn-cog menu-icon"></em>
              <span class="menu-title">Admin. système</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="configs">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/users">Config. utilisateurs</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/courriers">Config. courriers</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/finances">Config. finances</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/configs/directions">Config. direction</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item config systeme -->

          <!-- Item Gestion courriers -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#courriers" aria-expanded="false" aria-controls="courriers">
              <em class="typcn typcn-mail menu-icon"></em>
              <span class="menu-title">Gestion courriers</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="courriers">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/init">Initiation</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/archives">Archives</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/courriers/inbox">Boite de reception</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item Gestion courriers -->

          <!-- Item Requête de fonds -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#requests" aria-expanded="false" aria-controls="requests">
              <em class="typcn typcn-film menu-icon"></em>
              <span class="menu-title">Requête de fonds</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="requests">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/init">CRF</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/archives">Mes requêtes</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/requests/inbox">Synthese CRF</nuxt-link></li>
              </ul>
            </div>
          </li>
          <!-- End item Requête de fonds -->

          <!-- Item ressources financiers -->
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#finances" aria-expanded="false" aria-controls="finances">
              <em class="typcn typcn-credit-card menu-icon"></em>
              <span class="menu-title">Ressources financières</span>
              <em class="typcn typcn-chevron-right menu-arrow"></em>
            </a>
            <div class="collapse" id="finances">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/collection">Encaissement</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/disbursement">Synthèse transactions</nuxt-link></li>
                <li class="nav-item"> <nuxt-link class="nav-link" to="/finances/synthesis">Rapport financier</nuxt-link></li>
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