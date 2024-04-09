const axios = require('axios')
const cheerio = require('cheerio')
const totalIds = 139242

// Main mechanics

let character = {
    id: 0,
    name: '',
    mediaFrom: '',
    hits: '',
    link: '',
    image: ''
}

let rarityLevels = {
    loofah: 1000,
    D: 1500,
    C: 2000,
    B: 3000,
    A: 4000,
    S: 5000,
    Goat: 6000
}

async function rollCharacter() {
    try {

        let isAvailiable = false

        const database = 'https://www.animecharactersdatabase.com/characters.php?id='

        while (isAvailiable === false) {

            const randomId = Math.floor(Math.random() * totalIds) + 1
            const response = await axios.get(database + randomId)
            const $ = cheerio.load(response.data)

            //Character Data
            character.id = randomId
            character.name = $('.fgw').text().trim()
            character.mediaFrom = $('.characters_side_a table tbody tr:nth-child(5)').text().substring(10).replace(/(\r\n|\n|\r)/gm, "").trim()
            character.hits = parseInt($('#main1 table tbody tr:nth-child(2) a:nth-child(2)').text().replace(/[a-zA-Z\s]/g, ''))
            character.link = database + randomId
            const mediaType = $('.characters_side_a table tbody tr:nth-child(6)').text()
            character.image = $('#profilethumb').attr('src')

            if (mediaType.includes('anime') || mediaType.includes('ova') || mediaType.includes('movie')) {
                console.log(character)
                isAvailiable = true
            }
        }

    } catch (error) {
        console.error('Erro ao fazer webscrapping', error)
        throw error
    }
}

//Gatcha pack

async function gatchaRolls(rolls, rarityBase, rarityCap) {
    try {

        const database = 'https://www.animecharactersdatabase.com/characters.php?id='
        let charactersFound = 0

        while (charactersFound < rolls) {

            for (i = 0; i < rolls; i++) {

                const randomId = Math.floor(Math.random() * totalIds) + 1
                const response = await axios.get(database + randomId)
                const $ = cheerio.load(response.data)

                //Character Data
                character.id = randomId
                character.name = $('.fgw').text().trim()
                character.mediaFrom = $('.characters_side_a table tbody tr:nth-child(5)').text().substring(10).replace(/(\r\n|\n|\r)/gm, "").trim()
                character.hits = parseInt($('#main1 table tbody tr:nth-child(2) a:nth-child(2)').text().replace(/[a-zA-Z\s]/g, ''))
                character.link = database + randomId
                const mediaType = $('.characters_side_a table tbody tr:nth-child(6)').text()
                character.image = $('#profilethumb').attr('src')


                if (mediaType.includes('anime') || mediaType.includes('ova') || mediaType.includes('movie')) {
                    if (character.hits >= rarityBase && character.hits <= rarityCap) {
                        console.log(character)
                        charactersFound++
                        break
                    }
                }
            }
        }

    } catch (error) {
        console.error('Erro ao fazer webscrapping', error)
        throw error
    }
}

async function mediaRolls(charactersNumber, mediaName) {
    try {

        const database = 'https://www.animecharactersdatabase.com/characters.php?id='
        let charactersFound = 0

        while (charactersFound < charactersNumber) {

            for (i = 0; i < charactersNumber; i++) {

                const randomId = Math.floor(Math.random() * totalIds) + 1
                const response = await axios.get(database + randomId)
                const $ = cheerio.load(response.data)

                //Character Data
                character.id = randomId
                character.name = $('.fgw').text().trim()
                character.mediaFrom = $('.characters_side_a table tbody tr:nth-child(5)').text().substring(10).replace(/(\r\n|\n|\r)/gm, "").trim()
                character.hits = parseInt($('#main1 table tbody tr:nth-child(2) a:nth-child(2)').text().replace(/[a-zA-Z\s]/g, ''))
                character.link = database + randomId
                const mediaType = $('.characters_side_a table tbody tr:nth-child(6)').text()
                character.image = $('#profilethumb').attr('src')


                if (mediaType.includes('anime') || mediaType.includes('ova') || mediaType.includes('movie')) {
                    if (character.mediaFrom.toLowerCase().includes(mediaName)) {
                        console.log(character)
                        charactersFound++
                        break
                    }
                }
            }
        }

    } catch (error) {
        console.error('Erro ao fazer webscrapping', error)
        throw error
    }
}


mediaRolls(3, 'dragon ball')
