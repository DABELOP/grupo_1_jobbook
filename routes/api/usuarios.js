const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosAPIController');

router.get('/', usuariosAPIController.lista);

router.get('/:id', usuariosAPIController.detalle);

module.exports = router;