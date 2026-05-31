var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');
router.get('/', (req, res) => {
    res.render('cadastrarUsuario');
});

router.post('/', usuarioController.cadastrar);

module.exports = router;