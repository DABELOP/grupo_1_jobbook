const {body} = require("express-validator");

module.exports= [
    body("nombre").notEmpty().withMessage("Debes escribir tu nombre"),
    body("nombrePersonalizado").notEmpty().withMessage("Debes escribir tu nombre personalizado"),
    body("numeroDocumento").isLength({min:4}).withMessage('Debes ingresar un número válido').bail()
    .isInt().withMessage('Debes de ingresar solo numeros, sin espacios y sin caracteres especiales'),
    body("celular").isLength({min:9}).withMessage('Debes ingresar un número válido').bail()
    .isInt().withMessage('Debes de ingresar solo numeros, sin espacios y sin caracteres especiales'),
    body("ciudad").isAlpha().withMessage("La ciudad no debe contener números")
    .isLength({min:4}).withMessage("Debes ingresar una ciudad válida")
]

