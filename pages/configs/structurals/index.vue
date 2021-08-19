<template>
  <div class="content-wrapper">
    <div class="container-fluid mb-4">
      <div class="col-6 offset-lg-3">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="config-departments-tab" data-toggle="tab" href="#config-departments" role="tab" aria-controls="config-departments" aria-selected="true"><span class="typcn typcn-home-outline"></span> Configuration Departements</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="config-fonction-tab" data-toggle="tab" href="#config-fonction" role="tab" aria-controls="config-fonction" aria-selected="false"><span class="typcn typcn-puzzle-outline"></span> Configuration Fonctions</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <!-- Tab pane config department -->
      <div class="tab-pane fade show active" id="config-departments" role="tabpanel" aria-labelledby="config-departments-tab">
        <ConfigDepartment />
      </div>
      <!-- End tab pane config department -->

      <!-- Tab pane config fonction -->
      <div class="tab-pane fade" id="config-fonction" role="tabpanel" aria-labelledby="config-fonction-tab">
        <ConfigFonction />
      </div>
      <!-- End tab pane config fonction -->
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import ConfigDepartment from '@/components/configs/structurals/ConfigDepartment'
import ConfigFonction from '@/components/configs/structurals/ConfigFonction'

export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Configuration structurelle'
    }
  },
  components: {
    ConfigFonction, ConfigDepartment
  },
  mixins: [Global],
  computed: {
    currentPage() {
      return 'configs'
    },
    currentNavLink() {
      return 'structurals-configs'
    }
  },
  data() {
    return {
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
</style>