const express = require('express');
const path = require('path');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');

const multer = require('multer');
const storage = multer.diskStorage({
    //permite definir la carpeta donde se va  alamcenar el archivo
    destination: function(req, file, cb) {
    cb(null, 'public/images/imagenes-servicios');
    },
    //Permite indicar con que nombre se guardarĂ¡ ese archivo en el servidor
    filename: function(req, file, cb) {
    cb(null,
    `img-${file.fieldname}${path.extname(file.originalname)}`);
    }
    });
const upload = multer({storage: storage});
// solicita todos los servicios
router.get('/busqueda', serviciosController.busqueda);

//solicita servicios por categorias
router.get('/filtrar', serviciosController.filtrarPorCategoria);

//crear un servicio
router.get('/crear', serviciosController.crear);
router.post('/', upload.any(), serviciosController.guardar);

//Detalle de un servicio
router.get('/:id', serviciosController.detalleServicio);
router.get('/:id/contacto', serviciosController.contacto);

//Modificar un servicio
router.get('/editar/:idServicio', serviciosController.editar);
router.put('/editar/:idServicio', upload.any(), serviciosController.guardarEdicion);

//Eliminar un servicio
router.delete('/eliminar/:idServicio', serviciosController.eliminar);

//Agrega una pregunta
router.post('/:id/pregunta', serviciosController.guardarPregunta);


module.exports = router;