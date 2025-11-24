const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer.controller');

// Lấy thông tin hồ sơ
router.get('/profile/:id', employerController.getProfile);

// Cập nhật hồ sơ
router.put('/profile/:id', employerController.updateProfile);

module.exports = router;
