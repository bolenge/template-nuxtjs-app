<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title text-normal">{{ title }}</h4>

      <div class="table-responsive">
        <table class="table table-hover" aria-describedby="">
          <thead>
            <tr>
              <th scope="">#</th>
              <th
                v-for="(head, i) in headers"
                :key="i"
                :id="i"
              >
                {{ head.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="!items.length"
            >
              <td
                :colspan="headers.length + 1"
                class="text-center lead"
              >
                Aucun enregistrement...
              </td>
            </tr>
            <tr
              v-for="(item, i) in items"
              :key="i"
            >
              <td>{{ i + 1 }}</td>
              <td
                v-for="(head, j) in headers"
                :key="j"
              >
                <!-- Actions fields -->
                <span v-if="head.type == 'actions'">
                  <button class="btn btn-sm btn-info">
                    <span class="typcn typcn-pencil"></span>
                  </button>
                  <button class="btn btn-sm btn-danger">
                    <span class="typcn typcn-trash"></span>
                  </button>
                </span>
                <!-- End Actions fields -->

                <!-- Simple fields -->
                <span v-else>
                  {{ item[head.value] }}
                </span>
                <!-- End Simple fields -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Liste des enregistrements'
    },
    headers: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      load(dispatch) {
        return dispatch(this.model + '/load')
      }
    }),
    initItems() {
      this.load()
    }
  },
  computed: {
    ...mapState({
      items(state) {
        return state[this.model][`${this.model}s`]
      }
    })
  },
  mounted() {
    this.initItems()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>