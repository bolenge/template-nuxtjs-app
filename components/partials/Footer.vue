<template>
  <footer class="footer">
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
      <span class="text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="#" target="_blank" class="text-blue text-bold">One Touch</a> {{ year }} </span>
      <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Powered by <a href="https://mtechinteractives.com/" target="_blank" class="text-blue text-bold">Mtech Interactives</a></span>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year () {
      return (new Date).getFullYear()
    }
  }
}
</script>
<style>
  .text-blue {
    color: #2b80ff !important;
  }
  .text-bold {
    font-weight: bold !important;
  }
</style>