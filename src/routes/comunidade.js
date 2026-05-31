var express = require('express');
var router = express.Router();
//const grupoController = require('../controllers/grupoController.js');
router.get('/', (req, res) => {
    res.render('comunidade');
});

//router.post('/', grupoController.listarGrupo);

module.exports = router;