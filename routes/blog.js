const express = require('express');
const router = express.Router();

const Controller = require('../controllers/blog');

// 모든 포스터들 조회
router.get('/', Controller.index)

// 글쓰기 - POST
router.post('/create', Controller.create)

// 블로그 글 상세 페이지를 위한 코드
router.get('/:id', Controller.detail)

router.delete('/delete/:id', Controller.delete)

router.post('/update/:id', Controller.update)

module.exports = router;