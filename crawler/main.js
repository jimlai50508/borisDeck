const request = require('request')
const cheerio = require('cheerio')
const parse = require('himalaya').parse
const fs = require('fs')
const path = require('path')
const url = 'http://gametsg.techbang.com/hs/index.php?view=item&tag=%2CNeutral%2CHunter%2CMage%2CPaladin%2CPriest%2CRogue%2CShaman%2CWarlock%2CWarrior%2CDruid%2C#done'
const firebase = require('../firebase/firebase.js')
const database = firebase.database()

// 爬蟲資料
// request(url, (err, res, body) => {
//     const $ = cheerio.load(body)
//     let cards = $('#card_table tbody').text()
//     console.log(cards)
//     fs.writeFileSync('./crawler/table.txt', cards)
// })

// 整理資料
let rawCards = fs.readFileSync(path.join(__dirname, 'cards.txt'), 'utf-8').split('圖鑒')
let sortedCards = rawCards
    .map(card=> {
        let temp = card
            .split('\n')
            .filter(field=> field.trim().length > 0)
            .map(field=> field.trim())
        return temp
    })
    .filter(data=> data.length > 0)
    .map(card=> {
        return {
            eng: card[3],
            chi: card[2].slice(41),
            img: card[2].slice(0, 41),
            career: card[4],
            rank: card[5]
        }
    })

// 存至資料庫
database
    .ref('/cards')
    .set(sortedCards)
    .then(function() {
        process.exit()
    })
