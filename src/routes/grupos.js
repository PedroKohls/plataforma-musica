const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.get('/:grupos', grupoController.listarGrupo);

module.exports = router;