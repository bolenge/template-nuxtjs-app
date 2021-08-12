const API_BASE_URL = 'http://localhost:8000'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    API_BASE_URL: API_BASE_URL,
    DEFAULT_USER_AVATAR: `${API_BASE_URL}/storage/user_pictures/profile.png`,
    BASE_PATH_USER_PICTURES: `${API_BASE_URL}/storage/user_pictures`
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'One Touch',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Neo Touch est un Progiciel de gestion des données et des procédures  accessibles sur Smart Phone, Tablette et Ordinateur en temps réel.Il vous permet de collecter, de canaliser, d’analyser, de retracer et gérer toutes vos activités en temps réel avec une option (Intelligent Datat Access) par utilisateurs.' },
      { hid: 'author', name: 'author', content: 'Mtech Interactives, Don de Dieu Bolenge, Emmanuel Matondo' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
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
  ],
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
      login: '/login',
      logout: '/login',
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
