const {body} = require("express-validator");


module.exports= [
    body("nombre").notEmpty().withMessage("Debes escribir tu nombre"),
    body("correo").isEmail().withMessage("Debes escribir tu correo"),
    body("nombrePersonalizado").notEmpty().withMessage("Debes escribir tu nombre personalizado"),
    body("password").isLength({min:8}).withMessage("La contraseña debe de tener minimo 8 caracteres"),
    body("terminos").notEmpty().withMessage('Debes aceptar los terminos y condiciones'),
]