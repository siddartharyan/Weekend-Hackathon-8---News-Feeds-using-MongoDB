const express = require('express')
const app = express()
const port = 8080
const data = require('./data');
const len = data.length;
const onePageArticleCount = 10
const { newsArticleSchema } = require('./schema')
const { newsArticleModel } = require('./connector');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/newsFeeds', (req, res) => {
    const limit = (isNaN(req.query.limit) || Number(req.query.limit) >= len) ? 10 : Number(req.query.limit);
    const offset = (isNaN(req.query.offset) || Number(req.query.offset) >= len) ? 0 : Number(req.query.offset);
    newsArticleModel.find({}).skip(offset).limit(limit).then((result) => res.json(result)).then((err) => res.status(400).json(err))
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;