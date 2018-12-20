<template lang='pug'>
el-container
    Login(v-show='currentUser.length == 0')
    el-header(height='100px')
        nuxt-link.title(to='/') Boris's Deck
        .rightSection
            el-menu(
                class='el-menu-demo'
                mode='horizontal'
            )
                el-menu-item(v-for='(link, index) in links' :index='String(index)' :key='link.route')
                    nuxt-link(
                        :to='`/${link.route}`'
                    ) {{link.text}}
    el-main
        transition(name='main', mode='out-in')
            nuxt#main
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Login from '../components/login.vue'
import { setInterval } from 'timers';

export default {
    data() {
        return {
            links: [
                {route: 'mydeck', text: '我的牌組'},
                {route: 'newdeck', text: '新增牌組'},
                {route: 'game', text: 'Gaming'}
            ]
        }
    },
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        ...mapActions(['loadCards', 'registerHandler', 'loadUserDecks']),
        getIsNowRoute(route) {
            console.log(this.$route.path)
            if(this.$route.path.indexOf(route) != -1) {
                return true
            }
            return false
        },
        getTitleUser() {
            if(this.currentUser.length == 0) {
                return "Boris's Deck"
            } else {
                return `${this.currentUser}'s Deck`
            }
        }
    },
    mounted() {
        let self = this
        window.mystore = this.$store
        window.vm = this
        this.loadCards()
        this.$root.$on('userActivated', function() {
            self.$confirm('註冊成功，立刻建立你的牌組吧！', {
                type: 'success',
                confirmButtonText: 'Go!',
                showCancelButton: false,
                center: true
            })
            .then(function() {
                self.$router.push('./newdeck')
            })
            .catch(function() {
                console.log('no action.')
            })
        })
    },
    components: {
        Login
    },
    watch: {
        currentUser(newValue) {
            this.registerHandler(newValue)
            this.loadUserDecks(this.currentUser)
        }
    }
}
</script>

<style lang='sass'>
@import url('https://fonts.googleapis.com/css?family=Charm|Montserrat|Noto+Serif+TC')

*
    box-sizing: border-box
    font-size: 18px
    letter-spacing: 1.5px
    word-spacing: 1px
    text-decoration: none
    color: $black2
    transition: 0.5s

html, body
    +size(100%)
    display: flex
    justify-content: center
    margin: 0
    padding: 0
    background: $theme2
a
    color: #646464

input
    outline: none

#__nuxt, #__layout
    +size(100%)
    display: flex
    justify-content: center

.el-container
    +scrollbar(10px,  $black2,  $grey3)
    +size(100%)
    position: relative
    &>.el-header
        display: flex
        padding: 0 15%
        justify-content: space-between
        align-items: center
        text-align: center
        background: $theme4
        &>.title
            font-size: 40px
        &>.rightSection
            display: flex
            align-items: center
            &>.el-menu
                background-color: $theme4
                border: 0px
                &>.el-menu-item
                    display: flex
                    background-color: $theme4
                    padding: 0
                    &.is-active
                        border-bottom: 2px solid $theme6
                    &:hover
                        background-color: darken($theme4, 5)
                    &>a
                        +size(100%)
                        display: inline-block
                        padding: 0 20px
    & .el-main
        +size(100%)
        padding: 0
        overflow-y: scroll

#main
    +size(100%)
    padding: 40px 15% 0 15%

.el-scrollbar__wrap
    overflow-y: hidden

.main-enter-active, .main-leave-active
    transition: 0.5s
.main-enter, .main-leave-to
    opacity: 0
</style>
