const express = require('express');
const router = express.Router();

const User = require('../models/user');
const crypto = require('crypto');

const users = require('../data/users.json');

router.get('/', function(req, res, next) {
    User.find({}).then(it => res.json({users:it}));

    // res.json({user: users[0]});
});


// Sign Up
// POST로만 받는다. 
router.post('/signUp', function(req, res, next) {
    const user = new User();

    //setting values
    user.id = req.body.user.id;
    user.password = req.body.user.password;
    user.name = req.body.user.name;

    //encryption
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(user.password, 'utf8', 'base64');
    let cipherOutput = cipher.final('base64');
    user.password = cipherOutput;

    user.save(function(err) {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

// Sign In
// checkLogin
router.post('/checkLogin', function(req,res,next) {
    // DB에 암호화하여 저장하였으니 DB에서 확인할 때도 암호화 된 키로 확인한다.
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(req.body.user.password, 'utf8', 'base64');
    let cipherPW = cipher.final('base64');

    User.findOne({id: req.body.user.id, password: cipherPW}, function(err, user) {
        // 구문 error
        if(err) return res.status(500).json({error:err})

        // User가 없으면 error
        if(!user) return res.status(404).json({errer: 'user not found'})

        res.json(user);
    })
});

module.exports = router;