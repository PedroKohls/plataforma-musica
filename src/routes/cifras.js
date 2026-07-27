const express = require('express');
const router = express.Router();
const cifraController = require('../controllers/cifraController');

router.get('/criar', (req, res) => {
    res.render('formCifra');
});

router.post('/', cifraController.store);

router.get('/:cifra', cifraController.listarCifra);

module.exports = router;