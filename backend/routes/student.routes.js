const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// Lấy hồ sơ sinh viên
router.get('/profile/:id', studentController.getProfile);

// Cập nhật hồ sơ sinh viên
router.put('/profile/:id', studentController.updateProfile);

// Lấy danh sách việc làm đã lưu
router.get('/saved-jobs/:id', studentController.getSavedJobs);

// Lưu việc làm
router.post('/saved-jobs/:id', studentController.saveJob);

// Bỏ lưu việc làm
router.delete('/saved-jobs/:id/:jobId', studentController.unsaveJob);

// Ứng tuyển việc làm
router.post('/apply/:id', studentController.applyJob);

// Lấy danh sách đơn ứng tuyển
router.get('/applications/:id', studentController.getApplications);

module.exports = router;
