const express = require('express');
const router = express.Router();
const serviciosAPIController = require('../../controllers/api/serviciosAPIController');

router.get('/', serviciosAPIController.lista);
router.get('/categorias', serviciosAPIController.categorias);
router.get('/imagenes', serviciosAPIController.imagenes);
router.get('/preguntas', serviciosAPIController.preguntas);
router.get('/respuestas', serviciosAPIController.respuestas);
router.get('/:id', serviciosAPIController.detalle);


module.exports = router;