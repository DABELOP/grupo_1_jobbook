function invitadoMiddleware (req, res, next){
    if (req.session.usuarioLogueado){
        return res.redirect('/usuario/profile')
    }
    next();
}

module.exports = invitadoMiddleware;