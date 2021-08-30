<template>
  <div>
    <h4 class="mb-4 font-weight-400">
      <span class="typcn" :class="iconTitle"></span> {{ title }}
    </h4>

    <div class="row">
      <div class="col-md-4">
        <!-- Form create department -->
        <Create
          v-if="!edited"
          :title="createFormTitle"
          :fields="fields"
          :entity="entity"
          :model="model"
          :api="`${model}s`"
          :actionLoad="customLoadAction"
          @submitted="onSubmit"
        />
        <!-- End Form create department -->

        <!-- Form edit department -->
        <Edit
          v-if="edited"
          :title="editFormTitle"
          :fields="fields"
          :entity="entityEdited"
          :model="model"
          :api="`${model}s`"
          :actionLoad="customLoadAction"
          @submitted="onEdited"
        />
        <!-- End Form edit department -->
      </div>

      <div class="col-lg-8 grid-margin stretch-card">
        <!-- Table list department -->
        <SimpleTable
          :title="tableTitle"
          :headers="headers"
          :model="model"
          :customLoadAction="customLoadAction"
          :customModelStateItems="customModelStateItems"
          @launchEdited="onLaunchEdit"
        />
        <!-- End Table list department -->
      </div>
    </div>
  </div>
</template>

<script>
import Create from '@/components/crud/Create'
import Edit from '@/components/crud/Edit'
import SimpleTable from '@/components/crud/SimpleTable'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    createFormTitle: {
      type: String,
      default: 'Nouvel enregistrement'
    },
    editFormTitle: {
      type: String,
      default: 'Edition de l\'enregistrement'
    },
    model: {
      type: String,
      required: true
    },
    tableTitle: {
      type: String,
      default: 'Liste des enregistrements'
    },
    edited: {
      type: Boolean,
      default: false
    },
    entityEdited: {
      type: Object,
      default() {
        return {}
      }
    },
    fields: {
      type: Array,
      required: true
    },
    entity: {
      type: Object,
      default() {
        return {}
      }
    },
    headers: {
      type: Array,
      required: true
    },
    iconTitle: {
      type: String,
      default: 'typcn-home-outline'
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
  components: {
    Create, SimpleTable, Edit
  },
  data() {
    return {
    }
  },
  computed: {
    canEdit() {
      return Object.values(this.entityEdited).length !== 0
    }
  },
  methods: {
    onSubmit(entity) {
      this.$emit('entityReseted', entity)
    },
    async onLaunchEdit(id) {
      this.$emit('launchEdited', id)
    },
    onEdited() {
      this.$emit('edited', true)
    }
  }
}
</script>