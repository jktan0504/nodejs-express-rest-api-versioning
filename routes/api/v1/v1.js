var express = require('express');
var router = express.Router();

// Location
router.use('/location', require('./location/locationRoutes'));

// Auth
router.use('/auth', require('./auth/authMainRoutes'));

// Role
router.use('/roles', require('./roles/roleMainRoutes'));

// Role
router.use('/usergroups', require('./usergroups/usergroupsMainRoutes'));



module.exports = router;