const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public.controller');

router.get('/jobs', publicController.getJobs);
router.get('/companies', publicController.getCompanies);

module.exports = router;
