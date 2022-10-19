const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/login', usuariosController.login);
router.get('/register', usuariosController.register);
router.get('/:id/contacto/:idServicio', usuariosController.contacto);
router.get('/profile/:id', usuariosController.profile);
router.get('/profile/:id/servicios', usuariosController.misServicios);
//Modificar un perfil
router.get('/profile/editar/:id', usuariosController.editar);
router.put('/profile/editar/:id', upload.any(), usuariosController.guardarEdicion);



module.exports = router;