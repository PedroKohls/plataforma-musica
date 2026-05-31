const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musicaController');

router.get('/:artista/:musica', musicaController.listarMusica); 

module.exports = router;