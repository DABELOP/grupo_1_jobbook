const db = require('../database/models');

async function usuarioLogueadoMiddleware  (req,res,next){
    res.locals.estaLogueado = false; 

    if (req.cookies.emailUsuario){
    let correoEnCookie = req.cookies.emailUsuario;
    let usuarioDeCookie = await Promise.resolve(db.Usuario.findOne({where:{correo: correoEnCookie}}))
    

    if (usuarioDeCookie){
        req.session.usuarioLogueado = usuarioDeCookie;
    } 

    if (req.session.usuarioLogueado && usuarioDeCookie && req.cookies){
        req.session.usuarioLogueado = usuarioDeCookie;
        res.locals.estaLogueado = true;
        res.locals.usuario = usuarioDeCookie;

    } }

    next();
}

module.exports= usuarioLogueadoMiddleware;

