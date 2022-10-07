const express = require('express');
const router = express.Router();

const serviciosController = require('../controllers/serviciosController');

router.get('/busqueda', serviciosController.busqueda);
router.get('/:id', serviciosController.detalleServicio);
router.get('/contacto', serviciosController.contacto);
router.get('/crear', serviciosController.crear);
router.post('/servicios', serviciosController.guardar);
module.exports = router;