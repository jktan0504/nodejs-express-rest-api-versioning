
const express = require('express');
const { body } = require('express-validator');

const vendorAuthController = require('../../../../../controllers/v1/auth/vendorAuthController');

const router = express.Router();

// ** Vendor Auth
// POST /register
router.post('/register', vendorAuthController.register);


module.exports = router;