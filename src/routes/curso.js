const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/:curso', cursoController.listarCurso);

module.exports = router;