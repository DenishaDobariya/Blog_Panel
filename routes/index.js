const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passportConfig'); 
const blogController = require('../controllers/blogController');
const upload = require('../config/imgdb');
const isAuth = require('../middleware/auth'); 

// Routes for registration
router.get('/register', authController.renderRegister);
router.post('/register', authController.register);

router.get('/login', authController.renderLogin);
router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login',
    failureFlash: true 
}), authController.login);

router.get('/logout', authController.logout);

//Routes for blogs
router.get('/', blogController.getAllBlogs); 
router.get('/blogs', blogController.getAllBlogs); 
router.get('/my-blogs', isAuth, blogController.getMyBlogs);
router.get('/add', isAuth, blogController.renderAddBlog);
router.post('/add', isAuth, upload.single('image'), blogController.addBlog);
router.get('/edit/:id', isAuth, blogController.renderEditBlog);
router.post('/edit', isAuth, upload.single('image'), blogController.editBlog);
router.get('/delete/:id', isAuth, blogController.deleteBlog);
router.get('/blogs/:id', isAuth, blogController.viewBlog)


module.exports = router;
