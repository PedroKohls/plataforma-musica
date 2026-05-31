const express = require('express');
const router = express.Router();
const cifraController = require('../controllers/cifraController');

router.get('/', (req, res) => {
    res.render('formCifra');
});

router.post('/', cifraController.store);

module.exports = router;
