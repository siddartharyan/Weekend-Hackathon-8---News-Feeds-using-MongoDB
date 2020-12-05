const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
const { newsArticleSchema } = require('./schema')
const { newsArticleModel } = require('./connector');
const News = newsArticleModel;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const getAns = (data, limit, offset) => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(data[i]);
    }
    return arr;
}
app.get('/newsFeeds', (req, res) => {
    res.status(200).json({});
})

app.get('/newsFeeds/:limit/:offset', (req, res) => {
    let limit = req.params.limit;
    let offset = req.params.limit;
    if ((isNaN(limit) || isNaN(offset)) || (Number(limit) >= data.length || Number(offset) >= data.length)) {
        News.find({}).then((result) => res.json(getAns(result, 10, 0)));
        return;
    }
    offset = Number(offset);
    limit = Number(limit);
    News.find({}).then((result) => res.json(getAns(result, limit, offset)));
})

app.get('/newsFeeds/:limit', (req, res) => {
    let limit = req.params.limit;
    if (isNaN(limit) || Number(limit) >= data.length) {
        News.find({}).then((result) => res.json(getAns(result, 10, 0)));
    }
    limit = Number(limit);
    News.find({}).then((result) => res.json(getAns(result, limit, 0)));
})

app.get('/newsFeeds/:offset', (req, res) => {
    let offset = req.params.offset;
    let arr = [];
    if (isNaN(offset) || Number(offset) >= data.length) {
        News.find({}).then((result) => res.json(getAns(result, 10, 0)));
        return;
    }
    offset = Number(offset);
    News.find({}).then((result) => res.json(getAns(result, 10, offset)));
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;