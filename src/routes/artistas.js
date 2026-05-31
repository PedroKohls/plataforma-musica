const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/:artista', artistaController.listarArtista);

module.exports = router;