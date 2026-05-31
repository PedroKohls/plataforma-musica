const express = require('express');
const router = express.Router();
const cifraController = require('../controllers/cifraController');

router.get('/:cifra', cifraController.listarCifra); 

module.exports = router;