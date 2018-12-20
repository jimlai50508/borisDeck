<template lang='pug'>
#main
    .game
        .leftSection
            .msg(v-show='deckUsing.length == 0')
                .text 請選擇使用牌組
            .deckUsing(v-show='deckUsing.length > 0')
                img(@click='toggleUsed' v-for='card in deckUsing' :src='getImgUrl(card.img)')
        .rightSection
            .deckOption(v-for='mydeck in mydecks')
                img(@click='selectDeck(mydeck.id)' :src='getBestCardOfDeck(mydeck.deck)')
                .info
                    .deckname {{mydeck.name}}
                    .deckStatus(:class='{deckFull: mydeck.deck.length == 30}') {{`牌組狀態：${mydeck.deck.length}/30`}}

</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            deckUsing: []
        }
    },
    computed: {
        ...mapState(['userDecks']),
        mydecks() {
            let self = this
            return Object.keys(this.userDecks).map(deckid=> {
                return {
                    name: this.userDecks[deckid].name,
                    id: this.userDecks[deckid].id,
                    deck: this.userDecks[deckid].deck
                }
            })
        }
    },
    methods: {
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
        selectDeck(id) {
            this.deckUsing = this.userDecks[id].deck
            let imgs = Array.prototype.slice.call(document.getElementsByTagName('img'))
            imgs.forEach(img=> {
                img.classList.remove('used')
            })
        },
        toggleUsed(e) {
            e.srcElement.classList.toggle('used')
        }
    }
}
</script>

<style lang='sass'>
#main
    &>.game
        +size(100%, 95%)
        +scrollbar(8px,  $black2,  $grey3,  5px)
        display: flex
        justify-content: space-between
        &>.leftSection
            +size(69%, 100%)
            background: darken($theme4, 4)
            box-shadow: 0 0 10px black
            &>.msg
                +size(100%)
                display: flex
                justify-content: center
                align-items: center
            &>.deckUsing
                +size(100%)
                display: flex
                flex-wrap: wrap
                align-items: space-around
                &>img
                    +size(12.5%, 25%)
                    cursor: pointer
                    &.used
                        opacity: 0.3
        &>.rightSection
            +size(30%, 100%)
            overflow-y: scroll
            box-shadow: 0 0 10px black
            &>.deckOption
                +size(100%, 120px)
                display: flex
                padding: 5px 10px
                background: $theme4
                box-shadow: 0 0 10px black
                margin-bottom: 5px
                & img
                    +size(30%, 100%)
                    cursor: pointer
                &>.info
                    +size(70%, 100%)
                    display: flex
                    flex-direction: column
                    justify-content: flex-end
                    align-items: flex-end
                    padding: 10px 20px
                    white-space: nowrap
                    &>*
                        width: 100%
                        overflow: hidden
                        text-overflow: ellipsis
                    &>.deckname
                        font-size: 20px
                    &>.deckStatus
                        font-size: 16px
                        &.deckFull
                            color: darkred
</style>
