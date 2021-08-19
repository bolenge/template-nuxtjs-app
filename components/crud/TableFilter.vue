<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex">
        <div class="col-lg-8">
          <nuxt-link
            v-if="showButtonCreate"
            :to="buttonCreate.link"
            class="btn btn-info btn-sm mr-lg-3"
          >
            <span class="typcn typcn-plus"></span> {{ buttonCreate.text }}
          </nuxt-link>

          <button
            class="btn btn-success btn-sm mr-lg-3"
            @click="initItems"
          >
            <span class="typcn typcn-refresh"></span> Actualiser
          </button>

          <button
            v-if="extractData"
            class="btn btn-info btn-sm mr-lg-3"
          >
            <span class="typcn typcn-database"></span> Extraction données
          </button>

          <button class="btn btn-light btn-sm">
            <span class="typcn typcn-chevron-left"></span>
          </button>
          <span>1/10</span>
          <button class="btn btn-light btn-sm">
            <span class="typcn typcn-chevron-right"></span>
          </button>
        </div>
        <div class="form-group col-4">
          <div class="input-group">
            <label for="search" class="mr-3 mt-2">Filtre : </label>
            <input type="search" id="search" class="form-control form-control-sm py-2" placeholder="Recherche..." aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-sm btn-light" type="button"><span class="typcn typcn-zoom"></span></button>
            </div>
          </div>
        </div>
      </div>
      
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
            <!-- Loading -->
            <tr v-if="loading">
              <td
                :colspan="headers.length + 1"
                class="text-center lead"
              >
                Chargement...
              </td>
            </tr>
            <!-- End loading -->

            <!-- No items -->
            <tr
              v-else-if="!items.length"
            >
              <td
                :colspan="headers.length + 1"
                class="text-center lead"
              >
                Aucun enregistrement...
              </td>
            </tr>
            <!-- End no items -->

            <tr
              v-for="(item, i) in items"
              :key="i"
            >
              <td>{{ i + 1 }}</td>
              <td
                v-for="(head, j) in headers"
                :key="j"
                :class="{'py-1': head.type == 'image'}"
              >
                <!-- Image fields -->
                <img
                  v-if="head.type == 'image'"
                  :src="`${API_BASE_URL}/${head.baseUrl}/${item[head.value]}`"
                  alt="image"
                />
                <!-- End image fields -->

                <!-- Date fields -->
                <span
                  v-else-if="head.type == 'date'"
                >
                  {{ formatDate('dd/MM/yyyy', new Date(item[head.value])) }}
                </span>
                <!-- Date fields -->

                <!-- Badge fields -->
                <label
                  v-else-if="head.type == 'badge'"
                  class="badge"
                  :class="item.class"
                >
                  {{ item[head.value] }}
                </label>
                <!-- Badge fields -->

                <!-- Actions fields -->
                <span v-else-if="head.type == 'actions'">
                  <button class="btn btn-sm btn-info" @click="onLaunchEdit(item.id)">
                    <span class="typcn typcn-pencil"></span>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="onDelete(item.id)">
                    <span class="typcn typcn-trash"></span>
                  </button>
                  <button
                    v-if="showEyeButton"
                    class="btn btn-sm btn-success"
                  >
                    <span class="typcn typcn-eye-outline"></span>
                  </button>
                </span>
                <!-- End Actions fields -->

                <!-- Simple fields -->
                <span v-else-if="head.type == 'object'">
                  {{ getObject(item, head.value) }}
                </span>
                <!-- End Simple fields -->

                <!-- Simple fields -->
                <span v-else>
                  {{ item[head.value] || '---' }}
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
    },
    showEyeButton: {
      type: Boolean,
      default: false
    },
    extractData: {
      type: Boolean,
      default: false
    },
    buttonCreate: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods: {
    ...mapActions({
      load(dispatch) {
        return dispatch(this.model + '/load')
      },
      delete: 'crud/delete'
    }),
    initItems() {
      this.load()
    },
    onLaunchEdit(id) {
      this.$emit('launchEdited', id)
    },
    onDelete(id) {
      this.$swal({
        title: "Suppression",
        text: "Voulez-vous vraiment supprimé cet enregistrement ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showCancelButton: true
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          this.deleteRecord({id})
        }
      });
    },
    async deleteRecord(entity) {
      try {
        await this.delete({ entity, api: this.model+'s', model: this.model })
      } catch (error) {
        this.$toast.error('Une erreur est survenue, réessayez svp !')
      }
    },
    getObject(obj, path) {
      let items = path.split('.')
      let objRes = obj,
          i = items.length

      while (i > 0) {
        if (objRes === null) {
          break
        }
        
        objRes = objRes[items.shift()]

        i = items.length
      }

      return objRes || '---' 
    }
  },
  computed: {
    ...mapState({
      loading(state) {
        return state[this.model]['loading']
      },
      items(state) {
        return state[this.model][`${this.model}s`]
      }
    }),
    showButtonCreate() {
      return Object.values(this.buttonCreate).length !== 0
    }
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