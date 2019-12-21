
const express = require('express');
const { body } = require('express-validator');

const locationCityController = require('../../../../controllers/v1/location/locationCityController');

const router = express.Router();

// ** STATE
// GET /read
router.get('/read', locationCityController.index);
// GET /show
router.get('/:Id', locationCityController.show);
// POST /create
router.post('/create', locationCityController.create);
// UPDATE /:Id
router.put('/:Id', locationCityController.update);
// DELETE /:Id
router.delete('/:Id', locationCityController.delete);


module.exports = router;