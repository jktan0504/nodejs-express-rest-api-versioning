
const express = require('express');
const { body } = require('express-validator');

const roleController = require('../../../../../controllers/v1/roles/role/roleController');

const router = express.Router();

// ** ROLE
// GET /read
router.get('/read', roleController.index);
// GET /show
router.get('/:Id', roleController.show);
// POST /create
router.post('/create', roleController.create);
// UPDATE /:Id
router.put('/:Id', roleController.update);
// DELETE /:Id
router.delete('/:Id', roleController.delete);


module.exports = router;