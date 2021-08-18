<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ title }}</h4>

        <p
          v-if="description"
          class="card-description"
        >
          {{ description }}
        </p>

        <form class="forms-sample">
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
                {{ field.label }}
              </label>
              <input
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
            class="btn btn-primary mr-2"
          >
            Enregistrer
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
    }
  }
}
</script>