const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

exports.index = function(req, res, next) {
    Blog.find({}).then(all => res.json({allPosts:all}));
}

// 글쓰기 - POST
exports.create = function(req, res, next) {
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
}

// 블로그 글 상세 페이지를 위한 코드
exports.detail =  function(req, res, next) {
    const id = req.params.id;

    Blog.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "Not found blog with id " + id });
        } else {
            res.json({detailPost: data});
        }
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: "Error retrieving blog with id=" + id });
    });
}

exports.delete = function(req, res, next) {
    if (!req.params.id) {
        res.status(500).send('Id is not exist.');
        return;
    }
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    })
}

exports.update =  function(req, res, next) {
    if (!req.params.id) {
        res.status(500).send('Id is not exist.');
        return;
    }
    console.log(req.body);
    var newValue = {title: req.body.body.title, contents: req.body.body.contents}
    Blog.findByIdAndUpdate(req.params.id, newValue, (err) => {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    })
}
