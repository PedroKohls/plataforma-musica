const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

router.post('/', mensagemController.store);

module.exports = router;
