<template lang='pug'>
#login
    .container
        .title Boris's Deck
        .subtitle 當個洞悉一切的爐石記牌仔
        .text 現在就登入使用吧！
        .login.g-signin2(data-onsuccess='onSignIn' data-theme='dark' data-longtitle='true' data-width='280' data-height='50')
</template>

<script>
export default {

}
</script>

<style lang=<style lang="sass">
#login
    +size(100%)
    display: flex
    justify-content: center
    align-items: center
    background: rgba(black, 0.7)
    position: absolute
    left: 0
    top: 0
    z-index: 1000000
    &>.container
        +size(90%, 400px)
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        padding: 40px 60px
        background-color: $theme4
        border-radius: 10px
        position: relative
        box-shadow: 0px 0px 10px black
        z-index: 2
        &>*
            margin-bottom: 20px
        &>.title
            padding: 10px
            font-size: 64px
            border-bottom: 4px solid $theme5
            color: $black3
        &>.subtitle
            font-size: 28px
            color: $black2
        &>.text
            font-size: 18px
            color: $black3
        &>.login.g-signin2
            &>div
                margin: 0 auto
                border: 2px solid $themeGoogle
</style>
