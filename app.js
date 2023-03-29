const express = require('express');
const ejs = require('ejs');

const app = express();

const port = 3000;

// TEMPLATE ENGINE
// app.set('views', './');
app.set('view engine', 'ejs');

app.use(express.static('public'));

//####### ROUTES #######

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add-new-post', (req, res) => {
    res.render('add_post');
});

app.get('/blog/:id', (req, res) => {
    res.render('post');
});

//####### ROUTES #######

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});