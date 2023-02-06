// ES5
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Micro service API YT Captions')
})
app.get('/yt-caption', async (req, res) => {
    const getSubtitles = require('youtube-captions-scraper').getSubtitles;

    await getSubtitles({
        videoID: req.query.video_id, // youtube video id
        lang: 'en' // default: `en`
    }).then(function (captions) {
        let text = []
        captions.forEach((caption, key) => {
            let line = caption.text.toString().replace(/ *\[[^)]*\] */g, "")
            if (line) {
                text.push(line)
            }
        });
        res.send({ 'result': text.join(' ') })
    });
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

module.exports = app
