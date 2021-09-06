<template>
  <div class="card">
    <div
      v-if="title"
      class="card-header"
    >
      <h3 class="card-title mb-0 text-normal">{{ title }}</h3>
    </div>
    <div class="card-body">
      <div class="d-flex">
        <div class="col-lg-7">
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

          <download-csv
            v-if="extractData"
            class="btn btn-info btn-sm mr-lg-3 cursor-pointer"
            :class="{'disabled btn-in-loading': !exportItems.length}"
            :data="exportItems"
            delimiter=";"
            separator-excel
            :name="`${fileExtractName}.csv`"
          >
            <span class="typcn typcn-database"></span> Extraction données
          </download-csv>

          <span v-if="showPagination">
            <button
              class="btn btn-light btn-sm"
              :class="{'btn-in-loading disabled': disablePreviousButton}"
              :disabled="disablePreviousButton"
              @click="previousPaginate"
            >
              <span class="typcn typcn-chevron-left"></span>
            </button>
            <span>{{ countItems ? offset + 1 : 0 }}-{{ countItemsPaginated }} sur {{ countItems }}</span>
            <button
              class="btn btn-light btn-sm"
              :class="{'btn-in-loading disabled': disableNextButton}"
              :disabled="disableNextButton"
              @click="nextPaginate"
            >
              <span class="typcn typcn-chevron-right"></span>
            </button>
          </span>
        </div>
        <div class="form-group col-5">
          <div class="input-group">
            <label for="search" class="mr-3 mt-2">Filtre : </label>
            <select
              name="mounth"
              id="mounth"
              class="form-control form-control-sm mr-2"
              @change="filterByMounth"
            >
              <option value="#">Par Mois</option>
              <option value="01">Janvier</option>
              <option value="02">Févirier</option>
              <option value="03">Mars</option>
              <option value="04">Avril</option>
              <option value="05">Mai</option>
              <option value="06">Juin</option>
              <option value="07">Juillet</option>
              <option value="08">Aout</option>
              <option value="09">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novemebre</option>
              <option value="12">Décembre</option>
            </select>
            <input
              v-model="search"
              type="search"
              id="search"
              class="form-control form-control-sm py-2"
              placeholder="Recherche..."
              aria-label="Search"
            />
            <div class="input-group-append">
              <button class="btn btn-sm btn-light" type="button"><span class="typcn typcn-zoom"></span></button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover" aria-describedby="">
          <thead>
            <tr class="tr-table text-center">
              <th scope="">#</th>
              <th
                v-for="(head, i) in headers"
                :key="i"
                :id="i"
                class="font-weight-600"
              >
                <span v-if="head.defaultValue" class="text-white">{{ head.defaultValue }}</span>
                <span v-else>{{ head.text }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading -->
            <tr v-if="loading" class="text-center">
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
              v-else-if="!countItems"
              class="text-center"
            >
              <td
                :colspan="headers.length + 1"
                class="text-center lead"
              >
                {{ emptyDataMessage }}
              </td>
            </tr>
            <!-- End no items -->

            <tr
              v-for="(item, i) in itemsPaginated"
              :key="i"
              :class="trClass(item)"
              class="tr-table text-center"
            >
              <td>{{ offset + 1 + i}}</td>
              <td
                v-for="(head, j) in headers"
                :key="j"
              >
                <!-- Image fields -->
                <img
                  v-if="head.type == 'image'"
                  :src="`${API_BASE_URL}/${head.baseUrl}/${item[head.value]}`"
                  alt="image"
                  style="width: 30px;height: 30px;"
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
                  :class="head.types[item[head.value]]"
                >
                  {{ item[head.value] }}
                </label>
                <!-- Badge fields -->

                <!-- Badge fields -->
                <a
                  v-else-if="head.type == 'attachment'"
                  class="badge badge-info"
                  :href="`${API_BASE_URL}/${head.baseUrl}/${item[head.value]}`"
                  download="download"
                  target="_blank"
                >
                  <span class="typcn typcn-attachment"></span>
                </a>
                <!-- Badge fields -->

                <!-- Actions fields -->
                <span
                  v-else-if="head.type == 'actions'"
                >
                  <button
                    v-if="buttons.edit"
                    class="btn btn-sm btn-sm-action btn-info"
                    @click="onLaunchEdit(item.id)"
                  >
                    <span class="typcn typcn-pencil"></span>
                  </button>
                  <button
                    v-if="buttons.delete"
                    class="btn btn-sm btn-sm-action btn-danger"
                    @click="onDelete(item.id)"
                  >
                    <span class="typcn typcn-trash"></span>
                  </button>
                  <button
                    v-if="buttons.show"
                    class="btn btn-sm btn-sm-action btn-success"
                    @click="onShow(item.id)"
                  >
                    <span class="typcn typcn-eye-outline"></span>
                  </button>

                  <span>
                    <button
                      v-for="(button,iB) in customButtons"
                      :key="iB"
                      class="btn btn-sm btn-sm-action"
                      :class="button.type"
                      type="button"
                      @click="lauchCustomButtonEvent(button.event, item)"
                    >
                      <span
                        class="typcn"
                        :class="button.icon"
                      ></span>
                    </button>
                  </span>
                </span>
                <!-- End Actions fields -->

                <!-- Simple fields -->
                <span v-else-if="head.type == 'object'">
                  {{ getObject(item, head.value) }}
                </span>
                <!-- End Simple fields -->

                <!-- Simple fields -->
                <span v-else-if="head.type == 'amount-money'">
                  {{ getItemMoney(item, head.value) }}
                </span>
                <!-- End Simple fields -->

                <!-- Simple fields -->
                <span v-else-if="head.defaultValue"  class="text-white">
                  {{ head.defaultValue }}
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
import JsonCSV from 'vue-json-csv'

export default {
  components: {downloadCsv: JsonCSV},
  props: {
    title: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    buttons: {
      ttype: Object,
      default() {
        return {
          edit: true,
          show: false,
          delete: true
        }
      }
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
    actionLoad: {
      type: String,
      default: 'load'
    },
    customButtons: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    trClassByCondition: {
      type: Object,
      default() {
        return {}
      }
    },
    computedItems: {
      type: String,
      default: ''
    },
    payloadActionLoad: {
      type: Number
    },
    emptyDataMessage: {
      type: String,
      default: 'Aucun enregistrement...'
    },
    fieldsExtract: {
      type: Array,
      default() {
        return []
      }
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    fileExtractName: {
      type: String,
      default: 'extracton-donnees'
    }
  },
  data() {
    return {
      offset: 0,
      limit: 10,
      initLimit: 10,
      search: null,
    }
  },
  methods: {
    ...mapActions({
      load(dispatch) {
        return dispatch(this.model + '/' + this.actionLoad)
      },
      delete: 'crud/delete'
    }),
    initItems() {
      this.load({id: this.payloadActionLoad})
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
    onShow(id) {
      this.$emit('showed', id)
    },
    async deleteRecord(entity) {
      try {
        await this.delete({ entity, api: this.model+'s', model: this.model })
      } catch (error) {
        this.$toast.error('Une erreur est survenue, réessayez svp !')
      }
    },
    getObject(obj, path, typeField = 'string') {
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

      objRes = typeField === 'amount-money' ? objRes.toLocaleString() : objRes

      return objRes || '---' 
    },
    getItemMoney(obj, path) {
      const value = obj[path]
      return value ? value.toLocaleString() : '---'
    },
    nextPaginate() {
      this.offset = this.offset + this.limit
      this.limit = this.limit * 2
    },
    previousPaginate() {
      this.offset = this.offset - this.initLimit
      this.limit = this.limit / 2
    },
    lauchCustomButtonEvent(event, item) {;
      this.$emit(event, item)
    },
    trClass(item) {
      const className = this.trClassByCondition.class
      const condition = item[this.trClassByCondition.fieldCondition] == this.trClassByCondition.value
      return condition ? className : ''
    },
    filterByMounth(e) {
      this.search = e.target.value
    }
  },
  computed: {
    ...mapState({
      loading(state) {
        return state[this.model]['loading']
      },
      items(state) {
        const computedItems = this.computedItems || this.model+'s'
        return state[this.model][computedItems]
      },
      itemsState(state) {
        const computedItems = this.computedItems || this.model+'s'
        return state[this.model][computedItems]
      }
    }),
    showButtonCreate() {
      return Object.values(this.buttonCreate).length !== 0
    },
    countItems() {
      return this.itemsFiltered.length
    },
    itemsPaginated() {
      return this.itemsFiltered.slice(this.offset, this.limit)
    },
    countItemsPaginated() {
      return this.itemsPaginated.length + this.offset
    },
    disablePreviousButton() {
      return this.offset <= 0
    },
    disableNextButton() {
      return this.countItemsPaginated == this.countItems
    },
    fieldsFilterable () {
      const fields = []

      this.headers.map((head) => {
        if (head.filterable) {
          fields.push(head.value)
        }
      })

      return fields
    },
    itemsFiltered () {
      if (this.search) {
        const regex = new RegExp(this.search, 'ig')

        return this.items.filter((item) => {
          for (const filter of this.fieldsFilterable) {
            const value = this.getObject(item, filter)

            if (regex.test(value)) {
              return item
            }
          }
        })
      }

      return this.items
    },
    exportItems() {
      return this.items.map((item) => {
        const result = {}

        for (const field of this.fieldsExtract) {
          result[field.text] =  this.getObject(item, field.value)
        }

        return result
      })
    }
  },
  mounted() {
    this.initItems()
  }
}
</script>

<style>
</style>