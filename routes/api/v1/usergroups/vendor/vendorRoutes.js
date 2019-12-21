
const express = require('express');
const { body } = require('express-validator');

const vendorController = require('../../../../../controllers/v1/usergroups/vendor/vendorController');

const router = express.Router();

// ** Vendor
// GET /read
router.get('/read', vendorController.index);
// GET /show
router.get('/:Id', vendorController.show);
// POST /create
router.post('/create', vendorController.create);
// UPDATE /:Id
router.put('/:Id', vendorController.update);
// DELETE /:Id
router.delete('/:Id', vendorController.delete);


module.exports = router;