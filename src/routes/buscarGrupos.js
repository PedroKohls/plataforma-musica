const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController.js');

router.get('/', grupoController.list);

module.exports = router;
