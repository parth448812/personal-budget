const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = require('./budget-data.json');

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});



app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`App served at http://localhost:${port}`);
});