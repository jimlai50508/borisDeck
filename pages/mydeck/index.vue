<template lang='pug'>
#main
    .mydecks(
        v-loading='userDecks.length == 0'
        element-loading-text='正在載入您的牌組...'
    )
        .decks.modeNormal(
            v-for='mydeck in userDecks'
            :id='`deck${mydeck.id}`'
        )
            .leftSection
                .deckname {{mydeck.name}}
                img.deckThumbnail(:src='getBestCardOfDeck(mydeck.deck)')
                .deckStatus(:class='{deckFull: mydeck.deck.length == 30}') {{`牌組狀態：${mydeck.deck.length}/30`}}
            .rightSection
                .subTopSection
                    .tabs
                        .btnEdit
                            i.el-icon-edit-outline(@click='editDeck(mydeck.id)') 編輯
                        .btnView
                            i.el-icon-document(@click='viewDeck(mydeck.id)') 展開
                        .btnDelete
                            i.el-icon-delete(@click='deleteDeck(mydeck.id)') 刪除
                .subBottomSection
                    img.imgs(v-for='(card, index) in mydeck.deck' :src='getImgUrl(card.img)' :style='getTranslateX(index, mydeck.deck.length)')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import randomcolor from 'randomcolor'
import { setTimeout } from 'timers';

export default {
    computed: {
        ...mapState(['currentUser', 'userDecks']),
    },
    methods: {
        ...mapActions(['deleteDeckHandler', 'loadUserDecks']),
        getBestCardOfDeck(deck) {
            let card;
            if(deck.find(card=> card.rank == '傳說')) {
                card = deck.find(card=> card.rank == '傳說')
            } else if (deck.find(card=> card.rank == '史詩')) {
                card = deck.find(card=> card.rank == '史詩')
            } else if (deck.find(card=> card.rank == '精良')) {
                card = deck.find(card=> card.rank == '精良')
            } else if (deck.find(card=> card.rank == '普通')) {
                card = deck.find(card=> card.rank == '普通')
            } else if (deck.find(card=> card.rank == '基本')) {
                card = deck.find(card=> card.rank == '基本')
            }
            let img = `http://gametsg.techbang.com/hs/icon300/${card.img.split('/')[1]}.png`
            return img
        },
        getImgUrl(img) {
            return `http://gametsg.techbang.com/hs/icon300/${img.split('/')[1]}.png`
        },
        getTranslateX(index, length) {
            return {
                left: `${(index/length*85).toFixed(2)}%`
            }
        },
        viewDeck(id) {
            console.log(id)
            let deck = document.getElementById(`deck${id}`)
            deck.classList.toggle('modeNormal')
            deck.classList.toggle('modeView')
        },
        editDeck(id) {
            let self = this
            this.$confirm('要前往編輯頁面嗎？', {
                type: 'info',
                confirmButtonText: '確定',
                cancelButtonText: '取消',
            })
            .then(function(confirm) {
                self.$router.push(`/mydeck/${id}`)
            })
        },
        deleteDeck(id) {
            let self = this
            let user = this.currentUser
            if(Object.keys(this.userDecks).length > 1) {
                this.$confirm('確定要刪除牌組嗎？', {
                    type: 'error',
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                })
                .then(function(dialog) {
                    self.deleteDeckHandler([user, id]).then(function(res) {
                        self.loadUserDecks(user)
                    })
                })
                .catch(function(dialog) {
                    console.log('no action.')
                })
            } else {
                this.$message({
                    type: 'info',
                    message: '您必須至少擁有一副牌組'
                })
            }
        }
    },
    mounted() {
        let self = this

    }
}
</script>

<style lang='sass'>
#main
    &>.mydecks
        +size(100%)
        &>.decks
            &.modeNormal
                +size(100%, 340px)
                display: flex
                margin: 40px 0
                padding: 10px 20px
                box-shadow: 0 0 10px black
                &>.leftSection
                    display: flex
                    flex-direction: column
                    align-items: center
                    width: 15%
                    white-space: nowrap
                    &>*
                        margin-bottom: 10px
                    &>.deckname
                        width: 100%
                        color: $black2
                        font-size: 20px
                        overflow: hidden
                        text-overflow: ellipsis
                        text-align: center
                    &>.deckThumbnail
                        max-width: 100%
                    &>.deckStatus
                        &.deckFull
                            color: darkred
                            font-weight: bold
                &>.rightSection
                    display: flex
                    flex-direction: column
                    padding: 0 20px
                    width: 85%
                    &>.subTopSection
                        display: flex
                        justify-content: flex-end
                        align-items: center
                        padding: 0 20px
                        height: 60px
                        border-bottom: 2px solid $theme6
                        &>.tabs
                            display: flex
                            &>*
                                margin-right: 15px
                                cursor: pointer
                            &>[class^=btn]
                                &>i
                                    color: $black1
                                    margin-right: 2px
                                    font-weight: bold
                                &>span
                                    font-size: 14px
                    &>.subBottomSection
                        display: flex
                        align-items: center
                        height: 85%
                        position: relative
                        &>img
                            display: block
                            position: absolute
                            height: 90%
                            &:hover
                                transform: translateX(-60%)
            &.modeView
                +size(100%, 540px)
                display: flex
                margin: 40px 0
                padding: 10px 20px
                box-shadow: 0 0 10px black
                &>.leftSection
                    display: flex
                    flex-direction: column
                    align-items: center
                    width: 15%
                    white-space: nowrap
                    &>*
                        margin-bottom: 10px
                    &>.deckname
                        width: 100%
                        color: $black2
                        font-size: 20px
                        overflow: hidden
                        text-overflow: ellipsis
                        text-align: center
                    &>.deckThumbnail
                        max-width: 100%
                    &>.deckStatus
                        &.deckFull
                            color: darkred
                            font-weight: bold
                &>.rightSection
                    display: flex
                    flex-direction: column
                    padding: 0 20px
                    width: 85%
                    &>.subTopSection
                        display: flex
                        justify-content: flex-end
                        align-items: center
                        padding: 0 20px
                        height: 60px
                        border-bottom: 2px solid $theme6
                        &>.tabs
                            display: flex
                            &>*
                                margin-right: 15px
                                cursor: pointer
                            &>[class^=btn]
                                &>i
                                    color: $black1
                                    margin-right: 2px
                                    font-weight: bold
                                &>span
                                    font-size: 14px
                    &>.subBottomSection
                        display: flex
                        flex-wrap: wrap
                        align-items: center
                        height: 85%
                        position: relative
                        &>img
                            display: block
                            position: static
                            margin: 10px 0
                            width: 10%
                            height: 130px
                            &:hover
                                transform: scale(1.1)
                                cursor: pointer
                            &:active
                                transform: scale(2)
</style>
