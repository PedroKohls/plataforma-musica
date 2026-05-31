var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer(); 
const cursoController = require('../controllers/cursoController.js');

router.get('/', (req, res) => {
    res.render('enviarCurso');
});

router.post('/', upload.none(), cursoController.store);

module.exports = router;