<template>
  <div>
    <form class="pt-3">
      <div class="form-group">
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe" />
      </div>

      <div class="my-2 d-flex justify-content-between align-items-center">
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input border-info">
            Garder ma session active.
            <em class="input-helper"></em>
          </label>
        </div>
      </div>

      <div class="mt-3">
        <button class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn">CONNEXION</button>
      </div>
      <div class="text-center mt-4 font-weight-light">
        <nuxt-link to="/forgot-password">Mot de passe oublié ?</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>