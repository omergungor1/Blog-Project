const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const { getAllBlogs, getBlog, getEditPage, editBlog, deleteBlog, createBlog } = require('./controllers/blogControllers');
const { getNewBlogPage, getAboutPage } = require('./controllers/pageControllers');

const app = express();
const port = process.env.PORT || 3000;

// DATABASE CONNECTION
// mongoose.connect('mongodb://localhost:27017/cleanblog-test-db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://omergungorco:XecaYPfY6Sxi3zxV@cluster0.ygg0bio.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


// TEMPLATE ENGINE
app.set('views', './Views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//####### ROUTES #######
app.get('/', getAllBlogs);
app.get('/blog/:id', getBlog);
app.get('/blog/edit/:id', getEditPage);
app.put('/blog/edit/:id', editBlog);
app.delete('/blog/delete/:id', deleteBlog);
app.post('/blogs', createBlog);

app.get('/add-new-post', getNewBlogPage);

app.get('/about', getAboutPage);





//####### ROUTES #######

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});