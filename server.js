// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// app.use(express.json());

app.use(cors());

const mongoose = require('mongoose');
const  budgetModel  = require("./models/MyBudget_schema");
let url = 'mongodb://127.0.0.1:27017/budget-data';

// app.use(express.static('public'));
app.use('/', express.static('public'));



app.get('/budget-data', (req, res) => {
    mongoose.connect(url)
        .then(() => {
            return budgetModel.find({}); 
        })
        .then((data) => {
            console.log('Budget data:', data);
            res.json(data); 
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Unable to fetch data from MongoDB' });
        })
        .finally(() => {
            mongoose.connection.close(); 
        });
});

app.post('/add-budget', (req, res) => {
    mongoose.connect(url)
        .then(() => {
            const newBudget = new budgetModel({
                title: "New",
                budget: 100,
                color: "#0496FF"
            });
            return newBudget.save();
        })
        .then((savedBudget) => {
            console.log('New budget added:', savedBudget);
            res.json(savedBudget);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Unable to add new budget' });
        })
        .finally(() => {
            mongoose.connection.close(); 
        });
});



app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});