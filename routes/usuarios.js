const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const upload = require('../middlewares/multerUsuarioMiddleware');
const validationsRegister = require('../middlewares/validacionRegistroMiddleware');
const validationsEdit = require('../middlewares/validacionEditarPerfilMiddleware');
const authMiddleware = require('../middlewares/logueadoMiddleware');
const guestMiddleware = require('../middlewares/invitadoMiddleware');



router.get('/login',guestMiddleware, usuariosController.login);
router.get('/logout', usuariosController.logout);
router.post('/login', usuariosController.loginProcess);
router.get('/register', guestMiddleware, usuariosController.register);
router.post('/register', validationsRegister, usuariosController.crear);  //ESTE ES EL PENDIENTE 
router.get('/:id/contacto/:idServicio', authMiddleware, usuariosController.contacto);
router.get('/profile', authMiddleware, usuariosController.profile);
router.get('/profile/servicios', usuariosController.misServicios);
router.get('/profile/serviciosContactados', usuariosController.misServiciosContactados);
router.post('/profile/serviciosContactados/calificar/:id', usuariosController.calificar);
router.post('/verificacion',guestMiddleware, usuariosController.verificacion);

//Modificar un perfil
router.get('/profile/editar',authMiddleware, usuariosController.editar);
router.put('/profile/editar', upload.any(), validationsEdit, usuariosController.guardarEdicion);
router.get('/profile/editar/password',authMiddleware, usuariosController.password);
router.post('/profile/editar/password', usuariosController.cambiarPassword);




module.exports = router;