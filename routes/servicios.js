const express = require('express');
const router = express.Router();

const serviciosController = require('../controllers/serviciosController');

router.get('/', serviciosController.detalleServicio);

module.exports = router;