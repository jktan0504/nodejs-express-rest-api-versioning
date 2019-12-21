const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// ** User Groups Sub Routes
router.use('/vendor', require('./vendor/vendorRoutes'));
router.use('/vendor-category', require('./vendor/vendorCategoryRoutes'));

module.exports = router;