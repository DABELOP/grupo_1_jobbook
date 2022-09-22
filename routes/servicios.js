const express = require('express');
const router = express.Router();

const serviciosController = require('../controllers/serviciosController');

router.get('/', serviciosController.detalleServicio);
router.get('/busqueda', serviciosController.busqueda);
router.get('/crear', serviciosController.crear);
module.exports = router;