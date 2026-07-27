var express = require('express');
var router = express.Router();
const grupoController = require('../controllers/grupoController.js');

router.get('/', grupoController.comunidade);

module.exports = router;