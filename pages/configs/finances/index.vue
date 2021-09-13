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
    </div>
  </div>
</template>

<script>

import Global from '~/mixins/Global'
import ConfigAccountBank from '~/components/configs/finances/ConfigAccountBank'
import ConfigAccountCash from '~/components/configs/finances/ConfigAccountCash'
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
</style>