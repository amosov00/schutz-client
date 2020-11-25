const isProduction = process.env.NODE_ENV === "production"

export default {
  ssr: false,

  target: 'server',

  head: {
    title: 'Schutz',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Schutz fund'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700&display=swap'
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap',
        rel: 'stylesheet'
      }
    ]
  },

  server: {
    host: '0.0.0.0',
  },

  loading: {color: '#0495FB'},

  css: [
    {
      src: '~/assets/scss/main.scss',
      lang: 'scss'
    },
    {
      src: '~/assets/scss/transition.scss',
      lang: 'scss'
    },
    {
      src: '@fortawesome/fontawesome-free/css/all.css',
      lang: 'css'
    },
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
    '~/plugins/global-ui',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    ['nuxt-buefy', {css: false}],
    'cookie-universal-nuxt',
    'vue-social-sharing/nuxt',
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

  publicRuntimeConfig: {
    LANDING_BASE_URL: process.env.LANDING_BASE_URL || ''
  },

  sentry: {
    initialize: true,
    config: {
      environment: process.env.NODE_ENV,
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: !isProduction,
    }
  },

  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.xml$/,
        loader: 'xml-loader'
      })
      const assetsLoader = config.module.rules.find(rule => rule.test.test('.png'));
      assetsLoader.test = /\.(png|jpe?g|gif|svg|webp|pdf|ico)$/i;
      return config;
    }
  }
}
