const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();

router.post('/userRegistration', controller.userRegistration);


module.exports = router