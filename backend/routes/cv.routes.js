// Import Express
const express = require("express");
const router = express.Router();

// Import controller CV
const CVController = require("../controllers/cv.controller");

// ROUTES - Định nghĩa các đường dẫn API

// Route để lưu CV mới
router.post("/save", CVController.saveCV);

// Route để lấy danh sách CV của user
router.get("/list/:userId", CVController.getCVs);

// Route để lấy 1 CV theo ID
router.get("/:id", CVController.getCVById);

// Route để cập nhật CV
router.put("/:id", CVController.updateCV);

// Route để xóa CV
router.delete("/:id", CVController.deleteCV);

// Export router để dùng ở file khác
module.exports = router;
