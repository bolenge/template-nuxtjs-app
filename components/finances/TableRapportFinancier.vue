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
              v-if="true"
              v-model="mounthValue"
              name="mounth"
              id="mounth"
              class="form-control form-control-sm mr-2"
              @change="filterByMounth"
            >
              <option value="">Mois</option>
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
            <select
              v-if="true"
              v-model="yearValue"
              name="mounth"
              id="mounth"
              class="form-control form-control-sm mr-2"
              @change="filterByMounth"
            >
              <option value="">Année</option>
              <option
                v-for="(year, y) in years"
                :key="y"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
            <input
              v-if="false"
              v-model="search"
              type="search"
              id="search"
              class="form-control form-control-sm py-2"
              placeholder="Recherche..."
              aria-label="Search"
            />
            <div  v-if="false" class="input-group-append">
              <button class="btn btn-sm btn-light" type="button"><span class="typcn typcn-zoom"></span></button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover" aria-describedby="">
          <thead>
            <tr class="tr-table text-center">
              <th v-if="counter" scope="">#</th>
              <th
                v-for="(head, i) in headersShower"
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
              <td
                v-if="i == 0"
                :rowspan="rowSpan[item.sub_nature.nature.id]"
              >
                {{ item.sub_nature.nature.name }}
              </td>
              <td>{{ item.sub_nature.name }}</td>
              <td>{{ item.currency.code }}</td>
              <td>{{ item.amount.toLocaleString() }}</td>
              <td>{{ item.usd.toLocaleString() }}</td>
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
    },
    counter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      offset: 0,
      limit: 10,
      initLimit: 10,
      search: null,
      rowSpan: {},
      mounthValue: '',
      yearValue: new Date().getFullYear()
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
    getObject(obj, path, typeField = 'string', defaultValue = '---') {
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

      return objRes || defaultValue
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
    lauchCustomButtonEvent(event, item) {
      this.$emit(event, item)
    },
    trClass(item) {
      const className = this.trClassByCondition.class
      const condition = item[this.trClassByCondition.fieldCondition] == this.trClassByCondition.value
      return condition ? className : ''
    },
    filterByMounth(e) {
      this.search = this.yearValue+'-'+this.mounthValue+'-'

      console.log('this.this.items', this.itemsFiltered);
    },
    setRowSpan(id, rowspan) {
      this.rowSpan.push(id)

      return rowspan
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
      const items = this.items
      if (this.search) {
        return items.filter((item) => {
          if (item.created_at.split(this.search).length >= 2) {
            return item
          }
        })
      }

      items.map((item) => {
        this.rowSpan[item.sub_nature.nature.id] = this.rowSpan[item.sub_nature.nature.id] ? this.rowSpan[item.sub_nature.nature.id] + 1 : 1
      })

      return items
    },
    exportItems() {
      return this.items.map((item) => {
        const result = {}

        for (const field of this.fieldsExtract) {
          result[field.text] =  this.getObject(item, field.value)
        }

        return result
      })
    },
    years() {
      const years = []
      let currentYear = new Date().getFullYear()

      while (currentYear >= 2020) {
        years.push(currentYear)
        currentYear--
      }

      return years
    },
    headersShower() {
      return this.headers.filter((head) => head.text)
    }
  },
  mounted() {
    this.initItems()
    console.log('years', this.years);
  }
}
</script>

<style>
</style>