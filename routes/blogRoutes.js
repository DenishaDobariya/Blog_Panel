const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/imgdb');
const isAuth = require('../middleware/auth'); 

router.get('/', (req, res) => {
    res.render('myBlogs'); 
});
router.get('/', blogController.getAllBlogs); 
router.get('/my-blogs', isAuth, blogController.getMyBlogs);
router.get('/add', isAuth, blogController.renderAddBlog);
router.post('/add', isAuth, upload.single('image'), blogController.addBlog);
router.get('/edit/:id', isAuth, blogController.renderEditBlog);
router.put('/edit/:id', isAuth, blogController.editBlog);
router.delete('/delete/:id', isAuth, blogController.deleteBlog);

module.exports = router;
