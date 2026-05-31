const express = require('express');
const router = express.Router();
const acordeController = require('../controllers/acordeController.js');

router.get('/', acordeController.list);

module.exports = router;
