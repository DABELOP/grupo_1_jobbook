const {body} = require("express-validator");

module.exports= [
    body("nombre").notEmpty().withMessage("Debes escribir tu nombre"),
    body("correo").isEmail().withMessage("Debes escribir tu correo"),
    body("nombrePersonalizado").notEmpty().withMessage("Debes escribir tu nombre personalizado"),
    body("password").isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres"),
    body("numeroDocumento").isLength({min:4}).withMessage('Debes ingresar un número válido').bail()
    .isInt().withMessage('Debes de ingresar solo numeros, sin espacios y sin caracteres especiales'),
    body("celular").isLength({min:9}).withMessage('Debes ingresar un número válido').bail()
    .isInt().withMessage('Debes de ingresar solo numeros, sin espacios y sin caracteres especiales'),
    body("ciudad").isAlpha().isLength({min:4}).withMessage("Debes ingresar una ciudad válida")
]

