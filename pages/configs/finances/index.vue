<template>
  <div class="content-wrapper">
    <div class="mb-4">
      <div class="col-lg-12 d-flex justify-content-center">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <!-- Tab config comptes banks -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2 active" id="config-banks-tab" data-toggle="tab" href="#config-banks" role="tab" aria-controls="config-banks" aria-selected="true"><span class="typcn typcn-credit-card"></span> Comptes Bancaires</a>
          </li>
          <!-- End Tab config comptes banks -->

          <!-- Tab config comptes caisses -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-caisses-tab" data-toggle="tab" href="#config-caisses" role="tab" aria-controls="config-caisses" aria-selected="false"><span class="typcn typcn-document-text"></span> Comptes Caisses</a>
          </li>
          <!-- End Tab config comptes caisses -->

          <!-- Tab config natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-tags-tab" data-toggle="tab" href="#config-natures" role="tab" aria-controls="config-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Op. (Niveau 1)</a>
          </li>
          <!-- End Tab config natures -->

          <!-- Tab config sub-natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-tags-tab" data-toggle="tab" href="#config-sub-natures" role="tab" aria-controls="config-sub-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Op. (Niveau 2)</a>
          </li>
          <!-- End Tab config sub-natures -->

          <!-- Tab config comptes-natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-tags-tab" data-toggle="tab" href="#config-comptes-natures" role="tab" aria-controls="config-comptes-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Comptes Op. (Niveau 3)</a>
          </li>
          <!-- End Tab config comptes-natures -->
        </ul>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <!-- Tab pane config comptes bancaires -->
      <div class="tab-pane fade show active" id="config-banks" role="tabpanel" aria-labelledby="config-banks-tab">
        <ConfigAccountBank />
      </div>
      <!--  End tab pane config comptes bancaires -->

      <!-- Tab config comptes caisses -->
      <div class="tab-pane fade" id="config-caisses" role="tabpanel" aria-labelledby="config-caisses-tab">
        <ConfigAccountCash />
      </div>
      <!-- End Tab config comptes caisses -->

      <!-- Tab config Nature d'Operations (Niveau 1) -->
      <div class="tab-pane fade" id="config-natures" role="tabpanel" aria-labelledby="config-natures-tab">
        <ConfigNature />
      </div>
      <!-- Tab config Nature d'Operations (Niveau 1) -->

      <!-- Tab config Sub Nature d'Operations (Niveau 2) -->
      <div class="tab-pane fade" id="config-sub-natures" role="tabpanel" aria-labelledby="config-sub-natures-tab">
        <ConfigSubNature />
      </div>
      <!-- Tab config Sub Nature d'Operations (Niveau 2) -->

      <!-- Tab config Compte Nature d'Operations (Niveau 3) -->
      <div class="tab-pane fade" id="config-comptes-natures" role="tabpanel" aria-labelledby="config-comptes-natures-tab">
        <ConfigCompteNature />
      </div>
      <!-- Tab config Compte Nature d'Operations (Niveau 3) -->
    </div>
  </div>
</template>

<script>

import Global from '~/mixins/Global'
import ConfigAccountBank from '~/components/configs/finances/ConfigAccountBank'
import ConfigAccountCash from '~/components/configs/finances/ConfigAccountCash'
import ConfigNature from '~/components/configs/finances/ConfigNature'
import ConfigSubNature from '~/components/configs/finances/ConfigSubNature'
import ConfigCompteNature from '~/components/configs/finances/ConfigCompteNature'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration finances'
    }
  },
  mixins: [Global],
  components: {
    ConfigAccountBank,
    ConfigAccountCash,
    ConfigNature,
    ConfigSubNature,
    ConfigCompteNature,
  },
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'finances-configs'
    }
  },
  methods: {
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
  .nav-tabs .nav-item .nav-link {
    border-top: 2.5px solid #0063f7 !important;
  }
  .nav-tabs .nav-item .nav-link.active {
    background-color: #0063f7 !important;
    color: #fff !important;
  }
</style>