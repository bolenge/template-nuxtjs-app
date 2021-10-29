<template>
  <Nuxt />
</template>

<script>
import Global from '~/mixins/Global'

export default {
  head: {
    link: [
      {
        href: "https://fonts.googleapis.com/css?family=Raleway:300,400,600,700,800|Work+Sans:300,400,500,600,700",
        rel: "stylesheet",
      },
      {
        rel: "stylesheet",
        href: "/home/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href: "/home/css/linea-basic-icons.css"
      },
      {
        rel: "stylesheet",
        href: "/home/css/linea-ecommerce-icons.css"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      },
      {
        rel: "stylesheet",
        href: "/home/css/ripple.min.css"
      },
      {
        rel: "stylesheet",
        href: "/home/css/styles.css"
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/img/logos/logo-congo-book.png"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/img/logos/logo-congo-book.png"
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        integrity: "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49",
        crossorigin: "anonymous"
      },
      {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        integrity: "sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy",
        crossorigin: "anonymous"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
      },
      {
        src: "/home/js/jquery.scrollTo.min.js"
      },
      {
        src: "/home/js/jquery.easing.1.3.js"
      },
      {
        src: "/home/js/ripple.min.js"
      },
      {
        src: "/home/js/bootstrapValidator.min.js"
      },
      {
        src: "/home/js/custom-script.js"
      },
    ]
  },
  mixins: [Global],
  components: {},
  computed: {
  },
  mounted() {
    // TODO: Some things
  },
  methods: {
  }
}
</script>

<style>

</style>
