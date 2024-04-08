const axios = require('axios')
const cheerio = require('cheerio')
const totalIds = 139242

// Main mechanics
async function rollCharacter() {
    try {

        let isAnime = false
        let character = {
            name: null,
            mediaFrom: null,
            hitts: null,
            link: null,
            image: null
        }

        const database = 'https://www.animecharactersdatabase.com/characters.php?id='

        while (isAnime === false) {
            
            const randomId = Math.floor(Math.random() * totalIds) + 1
            const response = await axios.get(database + randomId)
            const $ = cheerio.load(response.data)

            //Character Data
            character.name = $('.fgw').text()
            character.mediaFrom = $('.characters_side_a table tbody tr:nth-child(5)').text().substring(10).replace(/(\r\n|\n|\r)/gm, "")
            character.hitts = $('#main1 table tbody tr:nth-child(2) a:nth-child(2)').text()
            character.link = database + randomId
            const mediaType = $('.characters_side_a table tbody tr:nth-child(6)').text()

            if (mediaType.includes('anime')) {
                console.log(character)
                isAnime = true
            }
        }

       // return character

    } catch (error) {
        console.error('Erro ao fazer webscrapping', error)
        throw error
    }
}

rollCharacter()
