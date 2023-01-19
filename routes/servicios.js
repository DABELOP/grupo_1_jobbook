const express = require('express');
const router = express.Router();

const serviciosController = require('../controllers/serviciosController');
const upload = require('../middlewares/multerServicioMiddleware');
const authMiddleware = require('../middlewares/logueadoMiddleware');

// solicita todos los servicios
router.get('/busqueda', serviciosController.busqueda);

//solicita servicios por categorias
router.get('/filtrar', serviciosController.filtrarPorCategoria);

//crear un servicio
router.get('/crear',authMiddleware, serviciosController.crear);
router.post('/', upload.any(),serviciosController.guardar);

//Detalle de un servicio
router.get('/:id', serviciosController.detalleServicio);
router.get('/:id/contacto', authMiddleware, serviciosController.contacto);

//Modificar un servicio
router.get('/editar/:idServicio', authMiddleware, serviciosController.editar);
router.put('/editar/:idServicio', upload.any(), serviciosController.guardarEdicion);

//Eliminar un servicio
router.delete('/eliminar/:idServicio', serviciosController.eliminar);

//Agrega una pregunta
router.post('/:id/pregunta', serviciosController.guardarPregunta);


module.exports = router;