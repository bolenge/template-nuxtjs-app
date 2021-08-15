<template>
  <!DOCTYPE html>
    <html lang="fr">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>One Touch Application</title>
        <!-- base:css -->
        <link rel="stylesheet" href="/vendors/typicons.font/font/typicons.css">
        <link rel="stylesheet" href="/vendors/css/vendor.bundle.base.css">
        <!-- inject:css -->
        <link rel="stylesheet" href="/css/vertical-layout-light/style.css">
      </head>
      <body>
          <div>
            <Nuxt />
          </div>

          <!-- container-scroller -->
          <!-- base:js -->
          <script src="/vendors/js/vendor.bundle.base.js"></script>
          <!-- endinject -->
          <!-- inject:js -->
          <script src="/js/off-canvas.js"></script>
          <script src="/js/hoverable-collapse.js"></script>
          <script src="/js/template.js"></script>
          <script src="/js/settings.js"></script>
          <script src="/js/todolist.js"></script>
      </body>
    </html>
</template>

<script>
import Navbar from '@/components/partials/Navbar'
import Sidebar from '@/components/partials/Sidebar'
import Footer from '@/components/partials/Footer'
export default {
  components: {Navbar, Sidebar, Footer}
}
</script>

<style>

</style>
