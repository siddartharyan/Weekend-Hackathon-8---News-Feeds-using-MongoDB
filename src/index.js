const express = require('express')
const app = express()
const port = 8080

const onePageArticleCount = 10
let data = require('./data');
data = data['data'];

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/newsFeeds', (req, res) => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(data[i]);
    }
    res.json(arr);
})

app.get('/newsFeeds/:limit/:offset', (req, res) => {
    let limit = req.params.limit;
    let offset = req.params.limit;
    let arr = [];
    if ((isNaN(limit) || isNaN(offset)) || (Number(limit) >= data.length || Number(offset) >= data.length)) {
        for (let i = 0; i < 10; i++) {
            arr.push(data[i]);
        }
        res.json(arr);
        return;
    }
    offset = Number(offset);
    limit = Number(limit);
    for (let i = offset; i < offset + limit; i++) {
        arr.push(data[i]);
    }
    res.json(arr);
})

app.get('/newsFeeds/:limit', (req, res) => {
    let limit = req.params.limit;
    let arr = [];
    if (isNaN(limit) || Number(limit) >= data.length) {
        for (let i = 0; i < 10; i++) {
            arr.push(data[i]);
        }
        res.json(arr);
        return;
    }
    limit = Number(limit);
    for (let i = 0; i < limit; i++) {
        arr.push(data[i]);
    }
    res.json(arr);
})

app.get('/newsFeeds/:offset', (req, res) => {
    let offset = req.params.offset;
    let arr = [];
    if (isNaN(offset) || Number(offset) >= data.length) {
        for (let i = 0; i < 10; i++) {
            arr.push(data[i]);
        }
        res.json(arr);
        return;
    }
    offset = Number(offset);
    for (let i = offset; i < offset + 10; i++) {
        arr.push(data[i]);
    }
    res.json(arr);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;