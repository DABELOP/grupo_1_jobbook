const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    //permite definir la carpeta donde se va  alamcenar el archivo
    destination: function(req, file, cb) {
    cb(null, './public/images/fotos-perfil');
    },
    //Permite indicar con que nombre se guardarĂ¡ ese archivo en el servidor
    filename: function(req, file, cb) {
        let filename = `${Date.now}-img-${file.fieldname}${path.extname(file.originalname)}`
    cb(null, filename);
    }
    });
const upload = multer({storage: storage});

module.exports = upload;