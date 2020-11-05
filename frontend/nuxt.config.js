export default {
  ssr: false,

  head: {
    title: 'My Schutz',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Schutz'}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png"},
      {rel: "manifest", href: "/manifest.json"},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700&display=swap'}
    ]
  },

  server: {
    host: '0.0.0.0',
  },

  loading: {color: '#0495FB'},

  css: [
    {src: '~/assets/scss/main.scss', lang: 'scss'},
    {src: '~/assets/scss/transition.scss', lang: 'scss'},
    {src: '@fortawesome/fontawesome-free/css/all.css', lang: 'css'},
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
  ],

  plugins: [
    '~/plugins/auth.js',
    '~/plugins/axios.js',
    '~/plugins/vee-validate.js',
    '~/plugins/contract.js',
    '~/plugins/text-highlight.js',
    '~/plugins/vue-clipboard.js',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    ['nuxt-buefy', {css: false}],
    'cookie-universal-nuxt',
    ['nuxt-i18n', {
      detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'lang',
          alwaysRedirect: true,
          fallbackLocale: 'ru'
        },
        locales: [
              {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                file: 'en-US.js'
              },
              {
                code: 'ru',
                iso: 'ru-RU',
                name: 'Russian',
                file: 'ru-RU.js'
              }
            ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru',
    }]
  ],

  sentry: {
    initialize: true,
    config: {
      environment: process.env.NODE_ENV,
    },
  },
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
    extend(config, ctx) {
    }
  }
}
