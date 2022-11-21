const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

const upload = require('../middlewares/multerUsuarioMiddleware');
const validationsRegister = require('../middlewares/validacionRegistroMiddleware');
const validationsEdit = require('../middlewares/validacionEditarPerfilMiddleware');
const authMiddleware = require('../middlewares/logueadoMiddleware');
const guestMiddleware = require('../middlewares/invitadoMiddleware');


router.get('/login',guestMiddleware, usuariosController.login);
router.post('/login', usuariosController.loginProcess);
router.get('/register', guestMiddleware, usuariosController.register);
router.post('/register', validationsRegister, usuariosController.crear);
router.get('/:id/contacto/:idServicio', authMiddleware, usuariosController.contacto);
router.get('/profile/:id', authMiddleware, usuariosController.profile);
router.get('/profile/:id/servicios', usuariosController.misServicios);

//Modificar un perfil
router.get('/profile/editar/:id',authMiddleware, usuariosController.editar);
router.put('/profile/editar/:id', upload.any(), validationsEdit, usuariosController.guardarEdicion);



module.exports = router;