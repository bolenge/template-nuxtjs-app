const API_BASE_URL = 'http://localhost:8000'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    API_BASE_URL: API_BASE_URL,
    DEFAULT_USER_AVATAR: `${API_BASE_URL}/storage/user_pictures/profile.png`,
    BASE_PATH_USER_PICTURES: `${API_BASE_URL}/storage/user_pictures`,
    APP_NAME: 'Neo Touch'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Neo Touch',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Neo Touch est un Progiciel de gestion des données et des procédures  accessibles sur Smart Phone, Tablette et Ordinateur en temps réel.Il vous permet de collecter, de canaliser, d’analyser, de retracer et gérer toutes vos activités en temps réel avec une option (Intelligent Data Access) par utilisateurs.' },
      { hid: 'author', name: 'author', content: 'Mtech Interactives, Don de Dieu Bolenge, Emmanuel Matondo' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "/vendors/typicons.font/font/typicons.css",
      },
      {
        rel: "stylesheet",
        href: "/vendors/css/vendor.bundle.base.css",
      },
      {
        rel: "stylesheet",
        href: "/vendors/select2/select2.min.css",
      },
      {
        rel: "stylesheet",
        href: "/vendors/select2-bootstrap-theme/select2-bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "/vendors/mdi/css/materialdesignicons.min.css",
      },
      {
        rel: "stylesheet",
        href: "/css/vertical-layout-light/style.css",
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      },
    ],
    script: [
      {
        src: "/js/jquery.js",
        defer: true,
      },
      {
        src: "/vendors/js/vendor.bundle.base.js",
        defer: true,
      },
      {
        src:"/js/off-canvas.js",
        defer: true,
      },
      {
        src:"/js/hoverable-collapse.js",
        defer: true
      },
      {
        src:"/js/template.js",
        defer: true
      },
      {
        src:"/js/settings.js",
        defer: true
      },
      {
        src:"/js/todolist.js",
        defer: true
      },
      {
        src:"/vendors/typeahead.js/typeahead.bundle.min.js",
        defer: true
      },
      {
        src:"/vendors/select2/select2.min.js",
        defer: true
      },
      {
        src:"/js/file-upload.js",
        defer: true
      },
      {
        src:"/js/typeahead.js",
        defer: true
      },
      {
        src:"/js/select2.js",
        defer: true
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global-mixin.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-sweetalert2/nuxt'
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui',
  },
  toast: {
    duration: 8000,
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  axios: {
    baseURL: `${API_BASE_URL}/api`
  },
  auth: {
    redirect: {
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'results.token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'results' }
        },
        tokenType: 'Bearer'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  target: 'static'
}
