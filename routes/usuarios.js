const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

const multer = require('multer');
const storage = multer.diskStorage({
    //permite definir la carpeta donde se va  alamcenar el archivo
    destination: function(req, file, cb) {
    cb(null, 'public/images/fotos-perfil');
    },
    //Permite indicar con que nombre se guardará ese archivo en el servidor
    filename: function(req, file, cb) {
    cb(null,
    `img-${file.fieldname}${path.extname(file.originalname)}`);
    }
    });
const upload = multer({storage: storage});

router.get('/login', usuariosController.login);
router.get('/register', usuariosController.register);
router.get('/:id/contacto/:idServicio', usuariosController.contacto);
router.get('/profile/:id', usuariosController.profile);
router.get('/profile/:id/servicios', usuariosController.misServicios);
//Modificar un perfil
router.get('/profile/editar/:id', usuariosController.editar);
router.put('/profile/editar/:id', upload.any(), usuariosController.guardarEdicion);



module.exports = router;