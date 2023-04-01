const Blog = require('../models/Blog');

exports.getAllBlogs = (req, res) => {
    const promise = Blog.find({}).sort('-dateCreated').exec();
    promise.then((blogs) => {
        res.render('index', { blogs });
    }).catch((err) => {
        console.log(err);
    });
};

exports.getBlog = (req, res) => {
    // res.render('postTest');
    const promise = Blog.findById(req.params.id).exec();
    promise.then((blog) => {
        res.render('post', { blog });
    }).catch((err) => {
        console.log(err);
    });
};

exports.getEditPage = (req, res) => {
    const promise = Blog.findById(req.params.id).exec();
    promise.then((blog) => {
        res.render('editPost', { blog });
    }).catch((err) => {
        console.log(err);
    });
};

exports.editBlog = (req, res) => {
    const promise = Blog.findById(req.params.id).exec();
    promise.then((blog) => {
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.save();
        res.redirect("/blog/" + req.params.id);
    }
    ).catch((err) => {
        console.log(err);
    });
};

exports.deleteBlog = (req, res) => {
    const promise = Blog.findByIdAndRemove(req.params.id).exec();
    promise.then((blog) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });
};

exports.createBlog = async (req, res) => {
    await Blog.create(req.body);
    res.redirect('/');
}