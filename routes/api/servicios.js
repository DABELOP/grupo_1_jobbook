const express = require('express');
const router = express.Router();
const serviciosAPIController = require('../../controllers/api/serviciosAPIController');

router.get('/', serviciosAPIController.lista);
router.get('/categorias', serviciosAPIController.categorias);
router.get('/:id', serviciosAPIController.detalle);


module.exports = router;