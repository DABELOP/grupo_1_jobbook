const fs = require('fs');
const path = require('path');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));


const usuariosController = {
    login: (req,res)=>{
        res.render('users/login');
    },
    register: (req,res)=>{
        res.render('users/register');
    },
    contacto: (req,res)=>{
        res.render('users/contacto_experto');
    },
    profile: (req,res)=>{
        let usuario=usuarios.find(usuario => usuario.id == req.params.id)
        res.render('users/profile',{usuario});
    },
};

module.exports = usuariosController;