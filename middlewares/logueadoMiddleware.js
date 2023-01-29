function logueadoMiddleware (req, res, next){
    if (!req.session.usuarioLogueado){
        if(req.params.id)req.session.ultimoServicio = req.params.id
        return res.redirect('/usuario/login')
    }
    next();
}

module.exports = logueadoMiddleware;