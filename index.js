// Instantiate package requirements
const PORT = 3001 || process.env.PORT;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

// Call express function for usage
const app = express();
const characters = []

app.get('/', function (req, res) {
    res.send("Welcome to the Wonderful World of One Piece!")

})

const test = "zoro"
app.get('/bio', (req, res) => {
    axios.get('https://onepiece.fandom.com/wiki/Straw_Hat_Pirates')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html)

            $(`a > small`, html).each(function () {
                const name = $(this).text();
                //const url = $(this).attr('href');
                characters.push({
                    name
                })
            })
            res.json(characters);
        }).catch((err) => console.log(err))

})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));