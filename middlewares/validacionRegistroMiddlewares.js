const {body} = require("express-validator");
module.exports= [
    body("nombre").notEmpty().withMessage("Debes de escribir tu nombre"),
    body("email").isEmail().withMessage("Debes de escribir tu correo"),
    body("nombrePersonalizado").notEmpty().withMessage("Debes de escribir tu nombre personalizado"),
    body("contraseña").isLength({min:8}).withMessage("La contraseña debe de tener minimo 8 caracteres"),
    body("Terminos").custom

]