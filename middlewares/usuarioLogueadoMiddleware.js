const path = require('path');
const fs = require('fs');
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));


function usuarioLogueadoMiddleware(req,res,next){
    res.locals.estaLogueado = false; 
    let correoEnCookie = req.cookies.emailUsuario;
    let usuarioDeCookie = usuarios.find(usuario => usuario.correo == correoEnCookie);

    if (usuarioDeCookie){
        req.session.usuarioLogueado = usuarioDeCookie;
    } 

    if (req.session.usuarioLogueado && usuarioDeCookie && req.cookies){
        req.session.usuarioLogueado = usuarioDeCookie;
        res.locals.estaLogueado = true;
        res.locals.usuario = usuarioDeCookie;

    } 

    next();
}

module.exports= usuarioLogueadoMiddleware;

