
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// ** AUTH
// POST /register
router.use('/vendor', require('./vendor/authVendorRoutes'));

module.exports = router;