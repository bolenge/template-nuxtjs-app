<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <h4 class="font-weight-400 mb-4"><span class="typcn typcn-credit-card"></span> Synthèse Transactions</h4>
    </div>
    
    <div class="container">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <!-- Nav Item Collection -->
            <li
              class="nav-item"
              role="presentation"
            >
              <a
                class="nav-link active py-2"
                id="collection-tab"
                data-toggle="tab"
                href="#collection"
                role="tab"
                aria-controls="collection"
                aria-selected="true"
              >
                <span class="typcn typcn-database"></span> Encaissements
              </a>
            </li>
            <!-- End Nav Item Collection -->

            <!-- Nav Item Disburse -->
            <li
              class="nav-item"
              role="presentation"
            >
              <a
                class="nav-link py-2"
                id="disburse-tab"
                data-toggle="tab"
                href="#disburse"
                role="tab"
                aria-controls="disburse"
                aria-selected="false"
              >
                <span class="typcn typcn-puzzle-outline"></span> Décaissements
              </a>
            </li>
            <!-- End Nav Item Disburse -->
          </ul>
        </div>
      </div>
    </div>

    <div class="tab-content" id="myTabContent">
      <!-- Tab pane collection transaction -->
      <div class="tab-pane fade show active" id="collection" role="tabpanel" aria-labelledby="collection-tab">
        <CollectionTransaction />
      </div>
      <!-- End tab pane collection transaction -->

      <!-- Tab pane disburse transaction -->
      <div class="tab-pane fade" id="disburse" role="tabpanel" aria-labelledby="disburse-tab">
        <DisburseTransaction />
      </div>
      <!-- End tab pane disburse transaction -->
    </div>
  </div>
</template>

<script>
import Global from '~/mixins/Global'
import CollectionTransaction from '~/components/finances/CollectionTransaction'
import DisburseTransaction from '~/components/finances/DisburseTransaction'

export default {
  middleware: ['auth', 'auth-superadmin-admin'],
  head() {
    return {
      title: 'Synthèse Transactions'
    }
  },
  mixins: [Global],
  components: {
    DisburseTransaction,
    CollectionTransaction,
  },
  data() {
    return {
      j: 1
    }
  },
  computed: {
    randValue() {
      return this.random(Math.random(),10)
    },
    currentPage() {
      return 'finances'
    },
    currentNavLink() {
      return 'transactions-finances'
    },
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>