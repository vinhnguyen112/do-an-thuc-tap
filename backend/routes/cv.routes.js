const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');

// Tạo CV mới
router.post('/', cvController.createCV);

// Lấy danh sách CV của sinh viên
router.get('/student/:id', cvController.getCVs);

// Lấy chi tiết CV
router.get('/:id', cvController.getCV);

// Cập nhật CV
router.put('/:id', cvController.updateCV);

// Xóa CV
router.delete('/:id', cvController.deleteCV);

module.exports = router;
