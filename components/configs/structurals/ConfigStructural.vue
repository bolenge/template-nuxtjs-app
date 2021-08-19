<template>
  <div>
    <h2 class="title mb-4"><span class="typcn typcn-home-outline"></span> {{ title }}</h2>

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
          @launchEdited="onLaunchEdit"
        />
        <!-- End Table list department -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    }
  },
  components: {
    Create, SimpleTable, Edit
  },
  data() {
    return {
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Intitulé'
        }
      ],
      entity: {
        name: ''
      },
      headers: [
        {
          text: 'Intitulé',
          value: 'name',
          type: 'string'
        },
        {
          text: 'Actions',
          value: '',
          type: 'actions'
        }
      ]
    }
  },
  computed: {
    canEdit() {
      return Object.values(this.entityEdited).length !== 0
    }
  },
  methods: {
    onSubmit(entity) {
      // Todo
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