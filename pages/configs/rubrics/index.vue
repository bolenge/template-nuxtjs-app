<template>
  <div class="content-wrapper">
    <div class="mb-4">
      <div class="col-lg-12 d-flex justify-content-center">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <!-- Tab config category-natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2 active" id="config-category-natures-tags-tab" data-toggle="tab" href="#config-category-natures" role="tab" aria-controls="config-category-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Op. (Niveau 1)</a>
          </li>
          <!-- End Tab config category-natures -->

          <!-- Tab config natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-natures-tags-tab" data-toggle="tab" href="#config-natures" role="tab" aria-controls="config-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Op. (Niveau 2)</a>
          </li>
          <!-- End Tab config natures -->

          <!-- Tab config sub-natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-sub-natures-tags-tab" data-toggle="tab" href="#config-sub-natures" role="tab" aria-controls="config-sub-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Nature Op. (Niveau 3)</a>
          </li>
          <!-- End Tab config sub-natures -->

          <!-- Tab config comptes-natures -->
          <li class="nav-item" role="presentation">
            <a class="nav-link py-2" id="config-comptes-natures-tags-tab" data-toggle="tab" href="#config-comptes-natures" role="tab" aria-controls="config-comptes-natures" aria-selected="false"><span class="typcn typcn-tags"></span> Comptes Op. (Niveau 4)</a>
          </li>
          <!-- End Tab config comptes-natures -->
        </ul>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <!-- Tab config Nature d'Operations (Niveau 1) -->
      <div class="tab-pane fade show active" id="config-category-natures" role="tabpanel" aria-labelledby="config-category-natures-tab">
        <ConfigCategoryNature />
      </div>
      <!-- Tab config Nature d'Operations (Niveau 1) -->

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
import ConfigNature from '~/components/configs/finances/ConfigNature'
import ConfigSubNature from '~/components/configs/finances/ConfigSubNature'
import ConfigCompteNature from '~/components/configs/finances/ConfigCompteNature'
import ConfigCategoryNature from '~/components/configs/finances/ConfigCategoryNature'
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration finances'
    }
  },
  mixins: [Global],
  components: {
    ConfigNature,
    ConfigSubNature,
    ConfigCompteNature,
    ConfigCategoryNature,
  },
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'rubrics-configs'
    }
  },
  methods: {
  }
}
</script>