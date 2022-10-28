const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

const upload = require('../middlewares/multerUsuarioMiddleware');
const validationsRegister = require('../middlewares/validacionRegistroMiddleware');
const validationsEdit = require('../middlewares/validacionEditarPerfilMiddleware');



router.get('/login', usuariosController.login);
router.get('/register', usuariosController.register);
router.post('/register', validationsRegister, usuariosController.crear);
router.get('/:id/contacto/:idServicio', usuariosController.contacto);
router.get('/profile/:id', usuariosController.profile);
router.get('/profile/:id/servicios', usuariosController.misServicios);

//Modificar un perfil
router.get('/profile/editar/:id', usuariosController.editar);
router.put('/profile/editar/:id', upload.any(), validationsEdit, usuariosController.guardarEdicion);



module.exports = router;