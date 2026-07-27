const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const multer = require('multer');
const upload = multer(); 

router.get('/criar', (req, res) => {
    res.render('enviarCurso');
});
router.post('/', upload.none(), cursoController.store);

router.get('/:curso', cursoController.listarCurso);

module.exports = router;