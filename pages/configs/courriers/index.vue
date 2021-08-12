<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-normal">Création type courrier</h4>

            <form class="forms-sample">
              <div class="form-group">
                <label for="name">Libellé <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm" id="name" required />
              </div>

              <div class="form-group">
                <label for="code">Code <span class="text-danger">*</span></label>
                <input type="text" class="form-control form-control-sm" id="code" required />
              </div>
              <button type="submit" class="btn btn-info mr-2">Enregistrer</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-normal">Liste de type de courriers</h4>

            <div class="table-responsive">
              <table class="table table-hover" aria-describedby="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Libellé</th>
                    <th>Code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 2" :key="i">
                    <td>{{ i }}</td>
                    <td>Courrier entrant</td>
                    <td>C-ENTRY-079-ONE</td>
                    <td>
                      <button class="btn btn-sm btn-info">
                        <span class="typcn typcn-pencil"></span>
                      </button>
                      <button class="btn btn-sm btn-danger">
                        <span class="typcn typcn-trash"></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Configuration courriers'
    }
  }
}
</script>

<style>
  .text-normal {
    text-transform: none !important;
  }
</style>