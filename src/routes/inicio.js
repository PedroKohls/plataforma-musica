var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.get('/', usuarioController.Inicio);

module.exports = router;
