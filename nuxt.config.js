const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'blue' },

  /*
  ** Global CSS
  */
  css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  ssr: true,
  target: 'server',

  modules: [
    '@nuxtjs/axios',

    'cookie-universal-nuxt',

    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],

  axios: {
    baseURL: 'http://localhost:8000' // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  proxy: {
    '/api/': { target: 'http://localhost:8000/', pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },

  /*
  ** Build configuration
  */
  build: {

  }
}
