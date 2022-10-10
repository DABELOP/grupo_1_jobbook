const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/login', usuariosController.login);
router.get('/register', usuariosController.register);
router.get('/contacto', usuariosController.contacto);
router.get('/profile/:id', usuariosController.profile);
router.get('/profile/:id/servicios', usuariosController.misServicios);


module.exports = router;