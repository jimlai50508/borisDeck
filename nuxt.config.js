const pkg = require('./package')
const path = require('path')

module.exports = {
    mode: 'universal',
    head: {
        title: "Boris's Deck",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
            { name: 'google-signin-client_id', content: '205401934261-ohpd17mtgkoeu65a68k6vb3mvn759n8o.apps.googleusercontent.com'},
            { name: 'google-signin-cookiepolicy', content: 'single_host_origin'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css' },
            { rel: 'stylesheet', href: '/style/vuejs-dialog.css' },
            { ref: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Charm|Montserrat|Noto+Serif+TC'}
        ],
        script: [
            { src: '/script/googleAuth.js', type: 'text/javascript' },
            { src: 'https://apis.google.com/js/platform.js', type: 'text/javascript', body: true}
        ]
    },
    plugins: [
        '@/plugins/element-ui',
        { src: '@/plugins/vue-dialog', ssr: false }
    ],
    modules: [
        'lodash',
        'randomcolor',
        ['nuxt-fontawesome', {
                component: 'fa',
                imports: [{
                    set: '@fortawesome/free-solid-svg-icons',
                    icons: ['fas']

                }]
        }],
    ],
    build: {
        styleResources: {
            sass: './assets/style/main.sass',
        }
    },
    css: ['~/assets/style/font.css']
}
