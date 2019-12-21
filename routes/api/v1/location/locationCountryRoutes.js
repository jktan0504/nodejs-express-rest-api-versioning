
const express = require('express');
const { body } = require('express-validator');

const locationCountryController = require('../../../../controllers/v1/location/locationCountryController');

const router = express.Router();

// ** COUNTRY
// GET /read
router.get('/read', locationCountryController.index);
// GET /show
router.get('/:Id', locationCountryController.show);
// POST /create
router.post('/create', locationCountryController.create);
// UPDATE /:Id
router.put('/:Id', locationCountryController.update);
// DELETE /:Id
router.delete('/:Id', locationCountryController.delete);


module.exports = router;