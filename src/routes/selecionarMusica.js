const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musicaController.js');

router.post('/', musicaController.valida);

module.exports = router;