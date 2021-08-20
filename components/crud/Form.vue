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
            :class="{'col-lg-6': formRow}"
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
                :for="field.name"
              >
                {{ field.label }} <span v-if="field.required" class="text-danger">*</span>
              </label>

              <!-- Select field -->
              <select
                v-if="field.type === 'select'"
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
                  {{ item.name }}
                </option>
              </select>
              <!-- End select field -->

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

              <!-- Input field -->
              <input
                v-else
                v-model="form[field.name]"
                :type="field.type"
                class="form-control form-control-sm"
                :id="field.name"
                :required="field.required"
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
      showPassword: false
    }
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
    
        // si le champs est un fichier et nous faisons un update on definie comme valeur par defaut un objet
        // en cas de modification pour prevenir de l'erreur d'un string affécté à un v-file-input
        if (field.type === 'file-image') {
          if (typeof this.form[field.name] === 'string') {
            this.form[`${field.name}_url`] = this.form[field.name]
          }
        }
      })
    },
    onSubmit() {
      this.$emit('submitted', this.form)
    },
    uploadFile(e) {
      const formData = new FormData();
      const imagefile = e.target;

      formData.append("media", imagefile.files[0]);

      this.$axios.post('/uploads/image', formData, {
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
    }
  },
  beforeMount(){
    this.initForm()
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>