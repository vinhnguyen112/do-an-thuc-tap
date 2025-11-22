const express = require("express");
const router = express.Router();

// Import controller đúng cách
const CVController = require("../controllers/cv.controller");

// ROUTES ★ KHÔNG ĐƯỢC GỌI HÀM — chỉ truyền CALLBACK vào thôi
router.post("/save", CVController.saveCV);
router.get("/list/:userId", CVController.getCVs);
router.get("/:id", CVController.getCVById);
router.put("/:id", CVController.updateCV);
router.delete("/:id", CVController.deleteCV);

module.exports = router;
