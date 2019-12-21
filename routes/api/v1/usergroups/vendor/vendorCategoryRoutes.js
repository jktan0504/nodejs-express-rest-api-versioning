
const express = require('express');
const { body } = require('express-validator');

const vendorCategoryController = require('../../../../../controllers/v1/usergroups/vendor/vendorCategoryController');

const router = express.Router();

// ** Vendor Category
// GET /read
router.get('/read', vendorCategoryController.index);
// GET /show
router.get('/:Id', vendorCategoryController.show);
// POST /create
router.post('/create', vendorCategoryController.create);
// UPDATE /:Id
router.put('/:Id', vendorCategoryController.update);
// DELETE /:Id
router.delete('/:Id', vendorCategoryController.delete);


module.exports = router;