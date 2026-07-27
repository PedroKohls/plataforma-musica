const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.get('/criar', (req, res) => {
    res.render('formGrupo');
});
router.get('/:grupos', grupoController.listarGrupo);
router.get('/grupos/:nome/buscar', grupoController.list);
router.get('/inscrever/:id', grupoController.inscrever);

router.post('/', grupoController.store);

module.exports = router;