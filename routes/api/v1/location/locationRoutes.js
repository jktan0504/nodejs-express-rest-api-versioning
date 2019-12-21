
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// ** Location Routes
router.use('/country', require('./locationCountryRoutes'));
router.use('/state', require('./locationStateRoutes'));
router.use('/city', require('./locationCityRoutes'));


module.exports = router;