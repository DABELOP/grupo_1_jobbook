const {body} = require("express-validator");

module.exports= [
    body("nombre").notEmpty().withMessage("Debes escribir tu nombre"),
    body("correo").isEmail().withMessage("Debes escribir tu correo"),
    body("nombrePersonalizado").notEmpty().withMessage("Debes escribir tu nombre personalizado"),
    body("password").isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres"),
    body("tipoDocumento").notEmpty().withMessage('Debes seleccionar un tipo de documento'),
    body("numeroDocumento").notEmpty().withMessage('Debes ingresar tu numero de documento de identidad').bail()
    .isInt().withMessage('Debes de ingresar solo numero'),
    body("celular").notEmpty().withMessage('Debes ingresar tu numero de celular').bail()
    .isInt().withMessage('Debes de ingresar solo numeros, sin espacios y sin caracteres especiales'),
    body("ciudad").notEmpty().withMessage("Debes ingresar tu ciudad de residencia")
]

