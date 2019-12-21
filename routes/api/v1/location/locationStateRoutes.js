
const express = require('express');
const { body } = require('express-validator');

const locationStateController = require('../../../../controllers/v1/location/locationStateController');

const router = express.Router();

// ** STATE
// GET /read
router.get('/read', locationStateController.index);
// GET /show
router.get('/:Id', locationStateController.show);
// POST /create
router.post('/create', locationStateController.create);
// UPDATE /:Id
router.put('/:Id', locationStateController.update);
// DELETE /:Id
router.delete('/:Id', locationStateController.delete);


module.exports = router;