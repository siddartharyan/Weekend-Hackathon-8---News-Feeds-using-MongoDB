const express = require('express')
const app = express()
const port = 8080
const data = require('./data');
const len = data.length;
const onePageArticleCount = 10
const { newsArticleSchema } = require('./schema')
const { newsArticleModel } = require('./connector');
const News = newsArticleModel;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/newsFeeds', (req, res) => {
    const limit = (isNaN(limit) || Number(limit) >= len) ? 10 : Number(limit);
    const offset = (isNaN(offset) || Number(offset) >= len) ? 0 : Number(offset);
    News.find({}).skip(offset).limit(limit).then((result) => res.json(result)).then((err) => res.status(400).json(err))
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;