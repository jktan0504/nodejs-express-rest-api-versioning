const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// ** Role Routes
router.use('/role', require('./role/roleRoutes'));


module.exports = router;