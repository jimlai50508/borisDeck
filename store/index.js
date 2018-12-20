import Vuex from 'vuex'
import firebase from '../firebase/firebase.js'

let database = firebase.database()

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            currentUser: '',
            login: false,
            cards: [],
            deckCreating: [],
            deckEditing: [],
            userDecks: []
        }),
        mutations: {
            setCards(state, data) {
                state.cards = data
            },
            updateDeckCreating(state, newDeck) {
                state.deckCreating = newDeck
            },
            updateDeckEditing(state, newDeck) {
                console.log('-----')
                console.log(newDeck)
                state.deckEditing = newDeck
            },
            setUserDecks(state, userDecks) {
                state.userDecks = userDecks
            }
        },
        actions: {
            loadCards(store) {
                database
                    .ref('/cards')
                    .once('value', function(docs) {
                        store.commit('setCards', docs.val())
                    })
            },
            loadUserDecks(store, user) {
                let ref = database.ref(`/users/${user}/mydecks`)
                ref.on('value', function(docs) {
                    console.log(docs.val())
                    if(docs.val()) {
                        store.commit('setUserDecks', docs.val())
                    }
                })
            },
            saveNewDeck(store, {deckName, user, deck}) {
                let self = this
                let id = new Date().getTime()
                database
                    .ref(`/users/${user}/mydecks/${id}`)
                    .set({
                        name: deckName,
                        deck: deck,
                        id: id
                    })
                    .then(function() {
                        window.vm.$message({
                            type: 'success',
                            message: `成功儲存牌組：${deckName}`
                        })
                        vm.$root.$emit('newDeckSaved')
                    })

            },
            registerHandler(store, user) {
                let ref = database.ref(`/users/${user}`)
                let nowtime = new Date().getTime()
                ref.once('value', function(doc) {
                    if(!doc.val()) {
                        ref.set({
                            registered: true
                        }).then(function() {
                            vm.$root.$emit('userActivated')
                        })
                    }
                })
            },
            deleteDeckHandler(store, [user, id]) {
                return new Promise((resolve, reject) => {
                    database
                        .ref(`/users/${user}/mydecks/${id}`)
                        .set({})
                        .then(function() {
                            resolve('Deck Deleted.')
                        })
                })
            },
            saveEditDeck(store, {deckName, deck, id, user}) {
                console.log(deckName, user, id)
                let self = this
                database
                    .ref(`/users/${user}/mydecks/${id}`)
                    .set({
                        name: deckName,
                        deck: deck,
                        id: id
                    })
                    .then(function() {
                        window.vm.$message({
                            type: 'success',
                            message: `成功更新牌組：${deckName}`
                        })
                        vm.$root.$emit('editDeckSaved')
                    })

            }
        }
    })
}

export default createStore
