<template>
  <!DOCTYPE html>
    <html lang="fr">
        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>Purple Admin</title>
            <!-- base:css -->
            <link rel="stylesheet" href="vendors/typicons.font/font/typicons.css">
            <link rel="stylesheet" href="vendors/css/vendor.bundle.base.css">
            <!-- endinject -->
            <!-- plugin css for this page -->
            <link rel="stylesheet" href="vendors/select2/select2.min.css">
            <link rel="stylesheet" href="vendors/select2-bootstrap-theme/select2-bootstrap.min.css">
            <link rel="stylesheet" href="vendors/mdi/css/materialdesignicons.min.css" />
            <!-- End plugin css for this page -->
            <!-- inject:css -->
            <link rel="stylesheet" href="css/vertical-layout-light/style.css">
        </head>
        <body>
            <div class="container-scroller">
            <!-- partial:partials/_navbar.html -->
            <Navbar />

            <!-- partial -->
            <div class="container-fluid page-body-wrapper">
                <!-- Sidebar -->
                <Sidebar />

                <!-- partial -->
                <div class="main-panel">
                    <Nuxt />

                    <!-- Sart footer -->
                    <Footer />
                    <!-- End footer -->
                </div>
                <!-- main-panel ends -->
            </div>
            <!-- page-body-wrapper ends -->
            </div>
            <!-- container-scroller -->
            <!-- base:js -->
            <script src="vendors/js/vendor.bundle.base.js"></script>
            <!-- endinject -->
            <!-- inject:js -->
            <script src="js/off-canvas.js"></script>
            <script src="js/hoverable-collapse.js"></script>
            <script src="js/template.js"></script>
            <script src="js/settings.js"></script>
            <script src="js/todolist.js"></script>
            <!-- endinject -->
            <!-- plugin js for this page -->
            <script src="vendors/typeahead.js/typeahead.bundle.min.js"></script>
            <script src="vendors/select2/select2.min.js"></script>
            <!-- End plugin js for this page -->
            <!-- Custom js for this page-->
            <script src="js/file-upload.js"></script>
            <script src="js/typeahead.js"></script>
            <script src="js/select2.js"></script>
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
