const express = require('express');
const router = express.Router();

const serviciosController = require('../controllers/serviciosController');

router.get('/', serviciosController.detalleServicio);
router.get('/busqueda', serviciosController.busqueda);
router.get('/contacto', serviciosController.contacto);
router.get('/crear', serviciosController.crear);
router.post('/productos', serviciosController.guardar);
module.exports = router;