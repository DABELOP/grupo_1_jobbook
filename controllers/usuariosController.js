const usuariosController = {
    login: (req,res)=>{
        res.render('login');
    },
    register: (req,res)=>{
        res.render('register');
    },
    contacto: (req,res)=>{
        res.render('contacto_experto');
    },
};

module.exports = usuariosController;