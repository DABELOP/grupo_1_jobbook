const fs = require('fs');
const path = require('path');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));

const rutaServicios = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(rutaServicios, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        res.render('users/profile',{usuario, toThousand});
    },
    misServicios: (req,res)=>{
        let serviciosUsuario=servicios.filter(servicio => servicio.idUsuario == req.params.id);
        let usuario=usuarios.find(usuario => usuario.id == req.params.id)
        res.render('users/mis_servicios',{usuario,serviciosUsuario, toThousand});
    },
    guardarEdicion: (req,res)=>{
        let usuarioEditado=usuarios.find(usuario=>usuario.id == req.params.idusuario);
        let idUsuario = usuarioEditado.id
        let nuevosUsuario=[]


        usuarios.forEach(usuario =>{

        if(usuario.id == usuarioEditado.id){
            usuario ={
                ...usuarioEditado,
                ...req.body,
            }
        }
        nuevosUsuarios.push(usuario)
        })

        fs.writeFileSync(rutaUsuarios, JSON.stringify(nuevosUsuarios, null))

        res.redirect('/usuario/profile/'+ idUsuario);
    },
   
};

module.exports = usuariosController;