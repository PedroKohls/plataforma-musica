const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController.js');

router.get('/', artistaController.list);

module.exports = router;
