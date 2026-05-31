var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', usuarioController.logar);

module.exports = router;
