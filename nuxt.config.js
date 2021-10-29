const API_BASE_URL = 'http://localhost:8000'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    API_BASE_URL: API_BASE_URL,
    DEFAULT_USER_AVATAR: `${API_BASE_URL}/storage/user_pictures/profile.png`,
    BASE_PATH_USER_PICTURES: `${API_BASE_URL}/storage/user_pictures`,
    APP_NAME: 'Neo Touch',
    TYPE_ACCOUNT_BANK: 1,
    TYPE_ACCOUNT_CASH: 2,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Template NuxtJS App',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: "stylesheet",
        href: "/css/main.css",
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      },
      {
        href: "https://fonts.googleapis.com/css?family=Montserrat:400,700,200",
        rel: "stylesheet",
      },
      {
        href: "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css",
        rel: "stylesheet"
      },
      {
        href: "/css/bootstrap.min.css",
        rel: "stylesheet"
      },
      {
        href: "/css/paper-dashboard.css?v=2.0.1",
        rel: "stylesheet"
      },
      {
        rel: "stylesheet",
        href: "/node_modules/swiper/swiper-bundle.min.css"
      },
      {
        href: "/demo/demo.css",
        rel: "stylesheet"
      },
      {
        href: "/css/style.css",
        rel: "stylesheet"
      },
      {
        href: "/css/loader.css",
        rel: "stylesheet"
      },
    ],
    script: [
      {
        src: "/js/main.js",
        defer: true,
      },
      {
        src: "/js/core/jquery.min.js",
        defer: true
      },
      {
        src: "/js/core/popper.min.js",
        defer: true
      },
      {
        src: "/js/core/bootstrap.min.js",
        defer: true
      },
      {
        src: "/js/plugins/perfect-scrollbar.jquery.min.js",
        defer: true
      },
      {
        src: "/js/plugins/chartjs.min.js",
        defer: true
      },
      {
        src: "/node_modules/swiper/swiper-bundle.min.js",
        defer: true
      },
      {
        src: "/node_modules/sweetalert/dist/sweetalert.min.js",
        defer: true
      },
      {
        src: "/js/plugins/bootstrap-notify.js",
        defer: true
      },
      {
        src: "/js/paper-dashboard.js",
        defer: true
      },
      {
        src: "/demo/demo.js",
        defer: true
      },
      {
        src: "/js/utils/functions.js",
        defer: true
      },
      {
        src: "/js/api/router.js",
        defer: true
      },
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
      login: '/login',
      callback: '/login',
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
