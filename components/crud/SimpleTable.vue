<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title text-normal mb-0 font-weight-400">{{ title }}</h4>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover" aria-describedby="">
          <thead>
            <tr class="tr-table text-center">
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
            <tr
              v-if="loading"
              class="text-center"
            >
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
              class="text-center"
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
              class="tr-table text-center"
            >
              <td>{{ i + 1 }}</td>
              <td
                v-for="(head, j) in headers"
                :key="j"
              >
                <!-- Actions fields -->
                <span v-if="head.type == 'actions'">
                  <button class="btn btn-sm btn-sm-action btn-info" @click="onLaunchEdit(item.id)">
                    <span class="typcn typcn-pencil"></span>
                  </button>
                  <button class="btn btn-sm btn-sm-action btn-danger" @click="onDelete(item.id)">
                    <span class="typcn typcn-trash"></span>
                  </button>
                </span>
                <!-- End Actions fields -->

                <!-- Simple fields -->
                <span v-else>
                  {{ getObject(item, head.value) }}
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
    customLoadAction: {
      type: String,
      default: ''
    },
    customModelStateItems: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions({
      load(dispatch) {
        const action = this.customLoadAction || 'load'
        return dispatch(this.model+'/'+action)
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
        text: "Voulez-vous vraiment supprimer cet enregistrement ?",
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
        await this.delete({ entity, api: this.model+'s', model: this.model, actionLoad: this.customLoadAction })
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
    },
  },
  computed: {
    ...mapState({
      loading(state) {
        return state[this.model]['loading']
      },
      items(state) {
        const fieldState = this.customModelStateItems || `${this.model}s`
        return state[this.model][fieldState]
      }
    })
  },
  mounted() {
    this.initItems()
  }
}
</script>

<style>
</style>