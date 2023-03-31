const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creat Schema
const BlogSchema = new Schema({
    title: String,
    content: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;