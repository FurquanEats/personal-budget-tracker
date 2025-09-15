const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/category-summary', reportController.getCategorySummary);

module.exports = router;