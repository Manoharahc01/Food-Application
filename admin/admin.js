const admin = require('../admin/adminController/adminController');
const express = require('express');
const router = express.Router();

router.post('/addCategory', admin.addCategory);



module.exports = router