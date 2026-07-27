const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController.js');
const acordeController = require('../controllers/acordeController.js');
const artistaController = require('../controllers/artistaController');
const musicaController = require('../controllers/musicaController');

router.get('/grupos', grupoController.list);
router.get('/artistas', artistaController.list);
router.get('/musicas', musicaController.list);
router.get('/acordes', acordeController.list);

module.exports = router;
