const path = require('path');
const fs = require('fs');
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));


function usuarioLogueadoMiddleware(req,res,next){
    res.locals.estaLogueado = false; 
    console.log(req.cookies.emailUsuario)
    let correoEnCookie = req.cookies.emailUsuario;
    let usuarioDeCookie = usuarios.find(usuario => usuario.correo == correoEnCookie);
    if (usuarioDeCookie){
        req.session.usuarioLogueado = usuarioDeCookie;
    }

    if (req.session && req.session.usuarioLogueado){
        res.locals.estaLogueado = true;
    } 

    next();
}

module.exports= usuarioLogueadoMiddleware;

