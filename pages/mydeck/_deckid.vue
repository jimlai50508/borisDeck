<template lang='pug'>
#deckEdit
    .scene
        .leftSection
            .topSection
                .subTopSection
                    .deckStatus(:class='{deckFull: deckEditing.length == 30}') {{`牌組狀態：${deckEditing.length}/30`}}
                    .buttons
                        el-button.btnSave(@click='saveDeck' type='info' icon='el-icon-check' plain)
                            span Save
                .subBottomSection
                    input#search(@keyup='updateKeyword($event, "keyword")' placeholder='搜尋卡牌...')
            .bottomSection(v-loading='!dataLoaded')
                v-drag#cards(
                    v-model='cards'
                    :options="{group:'people'}"
                    @start='drag=true'
                    @end='drag=false'
                )
                    .card(v-for='card in cards')
                        .cardContainer
                            img(:src='`http://gametsg.techbang.com/hs/icon300/${card.img.split("/")[1]}.png`')
        .rightSection
            #createDeck
                v-drag#deckCards(
                    v-model='deckEditing'
                    :options='{group:"people"}'
                    @start='drag=true'
                    @end='drag=false'
                )
                    .msg(v-if='deckEditing.length == 0')
                        .text 拖曳卡牌至此
                            fa(icon='arrow-down' :style='{marginLeft: "5px"}')
                    .deckCard(v-for='card in deckEditing')
                        img(:src='`http://gametsg.techbang.com/hs/icon300/${card.img.split("/")[1]}.png`')
            #mydecks
</template>

<script>
import lodash from 'lodash'
import VDrag from 'vuedraggable'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            imgLoaded: false,
            filter: {
                keyword: ''
            }
        }
    },
    computed: {
        ...mapState(['currentUser', 'userDecks']),
        deckid() {
            return this.$route.params.deckid
        },
        deckname() {
            return this.userDecks[this.$route.params.deckid].name
        },
        dataLoaded() {
            if(this.allcards.length > 0) {
                return true
            } else {
                return false
            }
        },
        allcards() {
            return this.$store.state.cards
        },
        cards: {
            get() {
                let self = this
                return this.$store.state.cards.filter(card=> {
                    return card.chi.toLowerCase().indexOf(self.filter.keyword.toLowerCase()) != -1 || card.eng.toLowerCase().indexOf(self.filter.keyword.toLowerCase()) != -1
                })
            },
            set(e) {

            }
        },
        deckEditing: {
            get() {
                function compare(a,b) {
                    if (a.chi < b.chi)
                        return -1
                    if (a.chi > b.chi)
                        return 1
                    return 0
                }
                return this.$store.state.deckEditing.sort(compare)
            },
            set(value) {
                console.log(value)
                if(value.length <= 30) {
                    this.$store.commit('updateDeckEditing', value)
                } else {
                    console.log('Deck is fulfilled.')
                }
            }
        }
    },
    methods: {
        ...mapActions(['saveEditDeck']),
        updateKeyword(e, field) {
            this.filter[field] = e.target.value
        },
        saveDeck() {
            let self = this
            if(this.deckEditing.length>24) {
                this.$prompt('確定更新牌組嗎？', '', {
                    confirmButtonText: '儲存',
                    cancelButtonText: '取消',
                    inputValue: self.deckname
                }).then(({value}) => {
                    let deckName;
                    if(!value) {
                        deckName = '我的牌組'
                    } else {
                        deckName = value
                    }
                    self.saveEditDeck({
                        deckName: deckName,
                        deck: self.deckEditing,
                        id: self.deckid,
                        user: self.currentUser
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '牌組未儲存'
                    });
                });
            } else {
                this.$message('請至少增加25張卡牌至牌組')
            }
        }
    },
    components: {
        VDrag
    },
    mounted() {
        let self = this
        this.$root.$on('editDeckSaved', function() {
            self.$router.push('/mydeck')
        })
        this.deckEditing = this.userDecks[this.$route.params.deckid].deck
    }
}
</script>

<style lang='sass'>
#main
    & img
        max-width: 100%
    &>.scene
        +size(100%)
        display: flex
        flex-direction: row-reverse
        &>.leftSection
            display: flex
            flex-direction: column
            flex: 7 0 0
            padding: 0 25px
            &>.topSection
                display: flex
                flex-direction: column
                justify-content: space-between
                position: relative
                max-height: 20%
                padding: 0 40px
                &>*
                    padding: 10px 0
                &>.subTopSection
                    +size(100%, 50%)
                    display: flex
                    justify-content: space-between
                    align-items: center
                    &>.deckStatus
                        &.deckFull
                            color: darkred
                            font-weight: bold
                            &::after
                                content: '(牌組已滿)'
                                margin-left: 10px
                &>.subBottomSection
                    +size(100%, 50%)
                    display: flex
                    justify-content: flex-end
                    &>#search
                        width: 50%
                        padding: 5px 8px
                        font-size: 14px
            &>.bottomSection
                +scrollbar(12px,  $black2,  $grey3,  5px)
                margin-top: 20px
                height: 80%
                &>#cards
                    height: 100%
                    overflow-y: scroll
                    display: flex
                    flex-wrap: wrap
                    padding: 20px
                    &>.card
                        width: 20%
                        &:hover
                            transform: translateY(-10px)
                        &>.cardContainer
                            width: 100%
                            &>img
                                width: 100%
                                cursor: pointer
        &>.rightSection
            flex: 3 0 0
            &>#createDeck
                +scrollbar(8px, $black2, $grey3, 5px)
                +size(100%, 95%)
                background: $grey3
                &:hover
                    background: rgba($grey3, 0.8)
                &>#deckCards
                    +size(100%)
                    overflow-y: scroll
                    padding: 15px 10px
                    &>.msg
                        +size(100%, 50%)
                        text-align: center
                        transform: translateY(95%)
                    &>.deckCard
                        width: 25%
                        float: left
                        &:hover
                            transform: scale(1.1)
                        &>img
                            width: 100%
                            cursor: pointer
                &>#hint
                    +size(100%)
                    display: flex
                    flex-direction: column
                    justify-content: center
                    align-items: center
                    cursor: pointer
</style>
