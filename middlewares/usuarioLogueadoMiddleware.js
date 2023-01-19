const db = require('../database/models');

async function usuarioLogueadoMiddleware(req, res, next) {
   
    res.locals.estaLogueado = false;
    if (req.cookies.emailUsuario) {

        let usuarioDeCookie = await Promise.resolve(db.Usuario.findOne({ where: { correo: req.cookies.emailUsuario } }))

        console.log(req.cookies.emailUsuario);

        if (usuarioDeCookie) {
            req.session.usuarioLogueado = usuarioDeCookie;
            res.locals.usuarioLogueado = usuarioDeCookie;
            res.locals.estaLogueado = true;
        }
    }

    if (req.session.usuarioLogueado) {
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        res.locals.estaLogueado = true;
    }
  
    next();
}

module.exports = usuarioLogueadoMiddleware;

