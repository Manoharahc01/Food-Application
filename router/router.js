const controller = require('../controller/controller');
const express = require('express');
const router = express.Router();

router.post('/userRegistration', controller.userRegistration);
router.post('/userLogin', controller.userLogin);
router.post('/verifyOtp', controller.verifyOtp);


module.exports = router