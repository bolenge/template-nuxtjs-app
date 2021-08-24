<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title text-normal text-center mb-0">{{ title }}</h4>
        <p
          v-if="description"
          class="card-description text-center"
        >
          {{ description }}
        </p>
    </div>
    <div class="card-body">
      <form class="forms-sample" @submit.prevent="onSubmit" autocomplete="off">
        <div :class="{'row': formRow}">
          <div
            v-for="(field, i) in fields"
            :key="i"
            :class="showColClass(field)"
          >
            <!-- Field checkbox -->
            <div
              v-if="field.type === 'checkbox'"
              class="form-check form-check-flat form-check-primary"
            >
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input">
                {{ field.label }}
              </label>
            </div>
            <!-- End field checkbox -->

            <!-- Field all type -->
            <div
              v-else
              class="form-group"
            >
              <label
                v-if="field.type !== 'hidden'"
                :for="field.name"
              >
                {{ field.label }} <span v-if="field.required" class="text-danger">*</span>
              </label>
              <!-- Select sync field -->
              <select
                v-if="field.type === 'select' && field.syncField !== undefined"
                v-model="form[field.name]"
                class="form-control"
                :id="field.name"
                :required="field.required"
                style="height: 39px;"
                @change="onChangeSyncerField"
              >
                <option
                  v-for="(item, it) in field.items"
                  :key="it"
                  :value="item.id"
                >
                  {{ item[field.itemText || 'name'] }}
                </option>
              </select>
              <!-- End select field -->

               <!-- Select field -->
              <select
                v-if="field.type === 'select' && field.childSync !== undefined"
                v-model="form[field.name]"
                class="form-control"
                :id="field.name"
                :required="field.required"
                style="height: 39px;"
                @change="onSyncParentChildren(field)"
              >
                <option
                  v-for="(item, it) in field.items"
                  :key="it"
                  :value="item.id"
                >
                  {{ item[field.itemText || 'name'] }}
                </option>
              </select>
              <!-- End select field -->

              <!-- Select field -->
              <select
                v-else-if="field.type === 'select'"
                v-model="form[field.name]"
                class="form-control"
                :id="field.name"
                :required="field.required"
                style="height: 39px;"
              >
                <option
                  v-for="(item, it) in field.items"
                  :key="it"
                  :value="item.id"
                >
                  {{ item[field.itemText || 'name'] }}
                </option>
              </select>
              <!-- End select field -->

              <!-- Input file field -->
              <div
                v-else-if="field.type === 'file'"
                class="d-flex"
              >
                <input
                  type="file"
                  name="media[]"
                  id="media"
                  class="form-control form-control-sm"
                  :class="{'col-10': showDownloadFile}"
                  data-type-media="file"
                  @change="uploadFile"
                />
                <input
                  v-model="form[field.name]"
                  type="hidden"
                  :name="field.name"
                  id="mediaDate"
                />
                <span
                  v-if="showDownloadFile=form[field.name]"
                  class="col-1"
                >
                  <a
                    :href="`${BASE_PATH_USER_PICTURES}/${showDownloadFile}`"
                    class="btn btn-sm btn-light text-info"
                    target="_blank"
                  >
                    <span class="typcn typcn-download-outline"></span>
                  </a>
                </span>
              </div>
              <!-- End Input file field -->

              <!-- Input file image field -->
              <div
                v-else-if="field.type === 'file-image'"
                class="d-flex"
              >
                <input
                  type="file"
                  name="media[]"
                  id="media"
                  class="form-control form-control-sm"
                  :class="{'col-9': previewImage}"
                  data-type-media="image"
                  @change="uploadFile"
                />
                <input
                  v-model="form[field.name]"
                  type="hidden"
                  :name="field.name"
                  id="mediaDate"
                />
                <img
                  v-if="previewImage=form[field.name]"
                  :src="`${BASE_PATH_USER_PICTURES}/${previewImage}`"
                  alt="Image"
                  class="col-3 w-100"
                />
              </div>
              <!-- End Input file image field -->

              <!-- Input password field -->
              <div
                v-else-if="field.type === 'password'"
                class="input-group"
              >
                <input
                  v-model="form[field.name]"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control form-control-sm"
                  :id="field.type"
                  :required="field.required"
                  :aria-label="field.name"
                />
                <div class="input-group-append">
                  <button class="btn btn-sm btn-light" type="button" @click="toggleShowPassword">
                    <span v-if="showPassword">Cacher</span>
                    <span v-else>Voir</span>
                  </button>
                </div>
              </div>
              <!-- End input password field -->

               <!-- Textarea field -->
               <textarea
                v-else-if="field.type === 'textarea'"
                v-model="form[field.name]"
                :name="field.name"
                :id="field.name"
                :required="field.required"
                :disabled="field.disabled"
                class="form-control form-control-sm"
              >
              </textarea>
              <!-- End Textarea field -->

              <!-- Input field -->
              <input
                v-else
                v-model="form[field.name]"
                :type="field.type"
                class="form-control form-control-sm"
                :id="field.name"
                :required="field.required"
                :disabled="field.disabled"
              />
              <!-- End input field -->
            </div>
            <!-- End field all type -->
          </div>
        </div>

        <div class="text-center">
          <!-- Button save -->
          <button
            type="submit"
            class="btn btn-info"
            :class="{'disabled btn-in-loading': loading}"
            :disabled="loading"
          >
            <span v-if="loading">Chargement...</span>
            <span v-else><span class="typcn typcn-input-checked"></span> Enregistrer</span>
          </button>
          <!-- End button save -->

          <!-- Button cancel -->
          <button
            v-if="showButtonCancel"
            type="reset"
            class="btn btn-light"
          >
            Annuler
          </button>
          <!-- End button cancel -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Nouvel enregsitrement'
    },
    description: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      required: true
    },
    showButtonCancel: {
      type: Boolean,
      default: false
    },
    entity: {
      type: Object,
      default() {
        return {}
      } 
    },
    loading: {
      type: Boolean,
      default: false
    },
    formRow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      previewImage: null,
      showPassword: false,
      syncField: null,
      defaultSyncValue: null,
      showDownloadFile: null,
      fieldsChildrenSync: []
    }
  },
  computed: {
  },
  watch: {
    entity() {
      this.initForm()
    }
  },
  methods: {
    initForm() {
      this.form = {...this.entity}

      this.fields.forEach((field) => {
        if (field.value) {
          this.form[field.name] = field.value
        }
    
        // si le champs est un fichier et nous faisons un update on definie comme valeur par defaut un objet
        // en cas de modification pour prevenir de l'erreur d'un string affécté à un v-file-input
        if (field.type === 'file-image') {
          if (typeof this.form[field.name] === 'string') {
            this.form[`${field.name}_url`] = this.form[field.name]
          }
        }

        if (field.type === 'hidden') {
          this.form[field.name] = field.value
        }

        if (field.type === 'select') {
          if (field.syncField !== undefined) {
            this.syncField = field.syncField
          }

          if (field.childSync) {
            this.fieldsChildrenSync.push(field) 
          }
        }

        if (field.isSync !== undefined) {
          this.defaultSyncValue = field.value
        }
      })
    },
    onSubmit() {
      this.$emit('submitted', this.form)
    },
    uploadFile(e) {
      const formData = new FormData();
      const imagefile = e.target;
      const typeMedia = imagefile.getAttribute('data-type-media')

      formData.append("media", imagefile.files[0]);

      this.$axios.post('/uploads/'+typeMedia, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(({ data }) => {
        if (data.state) {
          const mediaDate = document.querySelector('#mediaDate')

          this.form[mediaDate.name] = data.results.filename
          this.$toast.success(data.message)
          this.previewImage = data.results.filename
        }else {
          this.$toast.error(data.message)
        }
      }).catch((error) => {
        this.$toast.error('Une erreur est survenue lors de l\'upload, réessayez svp !')
      })
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    onChangeSyncerField(e) {
      if (this.syncField) {
        const value = e.target.value
        const fieldName = e.target.id
        const fieldFound = this.fields.find((field) => field.name === fieldName)

        if (fieldFound) {
          const itemFound = fieldFound.items.find((item) => item.id == value)

          if (itemFound) {
            this.form[this.syncField] = itemFound[fieldFound.syncFieldFromValue] + '/' + this.defaultSyncValue
          }
        }
      }
    },
    showColClass(field) {
      if (field.type == 'hidden') {
        return 'd-inline'
      }

      let className

      if (this.formRow && !field.colClass) {
        className = 'col-lg-6'
      }else if (field.colClass) {
        className = field.colClass
      }

      return className
    },
    onSyncParentChildren(field) {
      const fieldValue = this.form[field.name]
      const parent = field.items.find((f) => f.id == fieldValue)
      let childItems

      if (parent) {
        childItems = parent[field.childItems]

        this.fields.map((child) => {
          if (child.name == field.childSync) {
            child.items = childItems.length ? childItems : [child.objetEmpty]
          }
        })
      }
    },
    syncPopulateParentChildren(field) {
      const fieldValue = this.form[field.name]
      const parent = field.items.find((f) => f.id == fieldValue)
      let childItems

      if (parent) {
        childItems = parent[field.childItems]

        this.fields.map((child) => {
          if (child.name == field.childSync) {
            child.items = childItems.length ? childItems : [child.objetEmpty]

            if (child.childSync) {
              this.syncPopulateParentChildren(child)
            }
          }
        })
      }
    },
    populateFieldsChildrenSync() {
      this.fieldsChildrenSync.forEach((field) => {
        this.syncPopulateParentChildren(field)
      })
    }
  },
  beforeMount(){
    this.initForm()
  },
  mounted() {
    this.populateFieldsChildrenSync()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
  .btn-in-loading {
    cursor: not-allowed !important;
  }
</style>