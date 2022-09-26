const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/login', usuariosController.login);
router.get('/register', usuariosController.register);
router.get('/contacto', usuariosController.contacto);
router.get('/profile', usuariosController.profile);

module.exports = router;