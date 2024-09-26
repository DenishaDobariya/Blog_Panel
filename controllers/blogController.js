const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username'); 
        res.render('blog',{blogs});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).populate('author', 'username');
        console.log("blogs",blogs);
        
        res.render('myBlogs', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const renderAddBlog = (req, res) => {
    res.render('addBlog');
};

const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null;
        const blog = new Blog({ title, content, image, author: req.user.id });
        await blog.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const renderEditBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('editBlog', { blog });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const editBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null;
        await Blog.findByIdAndUpdate(req.params.id, { title, content, image });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {getAllBlogs, getMyBlogs, renderAddBlog, addBlog, renderEditBlog, editBlog, deleteBlog}