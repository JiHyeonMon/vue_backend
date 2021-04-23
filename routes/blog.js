const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

// 모든 포스터들 조회
router.get('/', function(req, res, next) {
    Blog.find({}).then(all => res.json({allPosts:all}));
})

// 글쓰기 - POST
router.post('/create', function(req, res, next) {
    const blog = new Blog();

    //setting value
    blog.title = req.body.post.title;
    blog.contents = req.body.post.contents;

    //save
    blog.save(
        function(err) {
            if(err) {
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        }
    );
});

module.exports = router;