var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', usuarioController.logar);

router.get('/logout', usuarioController.logout);

router.get('/criar', (req, res) => {
    res.render('cadastrarUsuario');
});

router.post('/', usuarioController.cadastrar);

module.exports = router;