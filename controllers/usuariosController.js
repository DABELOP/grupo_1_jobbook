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
    profile: (req,res)=>{
        res.render('profile');
    },
};

module.exports = usuariosController;