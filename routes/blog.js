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

// 블로그 글 상세 페이지를 위한 코드
router.get('/:id', function(req, res, next) {
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
});

router.delete('/delete/:id', function(req, res, next) {
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
});

router.post('/update/:id', function(req, res, next) {
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

})

// exports.index = (req, res, next) => {
//     Blog.find({}).then(all => res.json({allPosts:all}));
// };
  
// exports.create = (req, res, next) => {
//     let blog = new Blog({
//       title: req.body.title,
//       contents: req.body.contents
//     });
  
//     blog.save(
//         function(err) {
//             if(err) {
//                 console.error(err);
//                 res.json({result: 0});
//                 return;
//             }
//             res.json({result: 1});
//         }
//     );
// };
  
// exports.edit = (req, res, next) => {
//     Blog.findById(req.params.id, (err, todo) => {
//         if (err) {
//         return next(err);
//         }
//         res.status(200).json(todo);
//     });
// };
  
// exports.update = (req, res, next) => {
//     Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, todo) => {
//     if (err) {
//         return next(err);
//     }
//     res.status(200).json(todo);
//     });
// };  

// exports.delete = (req, res, next) => {
//     Blog.findByIdAndRemove(req.params.id, (err) => {
//         if (err) {
//             return next(err);
//         }
//         res.status(1)
//     })
// }

module.exports = router;