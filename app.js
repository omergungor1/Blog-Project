const express = require('express');
const mongoose = require('mongoose');
const ßSchema = mongoose;
const ejs = require('ejs');
const Blog = require('./models/Blog');

const app = express();
const port = 3000;

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Veritabanı bağlantısı başarılı olduğunda tetiklenen olay
mongoose.connection.on('connected', () => {
    console.log('Mongoose bağlantısı başarılı!');
});

// Veritabanı bağlantısı hatası olduğunda tetiklenen olay
mongoose.connection.on('error', (err) => {
    console.log('Mongoose bağlantı hatası: ' + err);
});

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// TEMPLATE ENGINE
// app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//####### ROUTES #######
app.get('/', (req, res) => {
    const promise = Blog.find({}).exec();
    promise.then((blogs) => {
        res.render('index', { blogs });
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/about', (req, res) => {
    res.render('postTest');
    // res.render('about');
});

app.get('/add-new-post', (req, res) => {
    res.render('add_post');
});

app.get('/blog/:id', (req, res) => {
    // res.render('postTest');
    const promise = Blog.findById(req.params.id).exec();
    promise.then((blog) => {
        res.render('post', { blog });
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/blogs', async (req, res) => {
    await Blog.create(req.body);
    res.redirect('/');
});

//####### ROUTES #######

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});