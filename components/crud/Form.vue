<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title text-normal">{{ title }}</h4>

      <p
        v-if="description"
        class="card-description"
      >
        {{ description }}
      </p>

      <form class="forms-sample" @submit.prevent="onSubmit" autocomplete="off">
        <div
          v-for="(field, i) in fields"
          :key="i"
          class="form-group"
          :class="{'form-check form-check-flat form-check-primary': field.type === 'checkbox'}"
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
            <input
              v-model="form[field.name]"
              :type="field.type"
              class="form-control"
              :id="field.type"
              :required="field.required"
            >
          </div>
          <!-- End field all type -->
        </div>

        <!-- Button save -->
        <button
          type="submit"
          class="btn btn-info"
        >
          <span v-if="loading">Chargement...</span>
          <span v-else>Enregistrer</span>
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
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    initForm() {
      this.form = {...this.entity}
    },
    onSubmit() {
      this.$emit('submitted', this.form)
      this.form = {}
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