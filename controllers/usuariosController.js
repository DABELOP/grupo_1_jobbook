const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs'); 

const {validationResult} = require('express-validator');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));

const rutaServicios = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(rutaServicios, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usuariosController = {
    login: (req,res)=>{
        res.render('users/login');
    },

    loginProcess: (req,res)=>{
        let usuarioLogin = usuarios.find(usuario => usuario.correo == req.body.correo);
        if (usuarioLogin){
            
            let validacionContrasena = bcryptjs.compareSync(req.body.password, usuarioLogin.password);

            if (validacionContrasena) {
                //delete usuarioLogin.password
                req.session.usuarioLogueado = usuarioLogin;
            
                if (req.body.recordarme){
                    res.cookie('emailUsuario',req.body.correo, {maxAge:1000*60*60})
                }
                return res.redirect('/')
            }
         }
        return res.render('users/login',{errores:{password:{msj:"Usuario o contraseña incorrectos"}}})
    },  

    register: (req,res)=>{
        res.render('users/register');
    },
    contacto: (req,res)=>{
        res.render('users/contacto_experto');
    },
    profile: (req,res)=>{
        let usuario=req.session.usuarioLogueado
        res.render('users/profile',{usuario, toThousand});
    },
    misServicios: (req,res)=>{
        let serviciosUsuario=servicios.filter(servicio => servicio.idUsuario == req.session.usuarioLogueado.id);
        let usuario=usuarios.find(usuario => usuario.id == req.session.usuarioLogueado.id)
        console.log(serviciosUsuario)
        res.render('users/mis_servicios',{usuario,serviciosUsuario, toThousand});
    },
    guardarEdicion: (req,res)=>{
        let errores = validationResult(req);
        let usuarioEditado=req.session.usuarioLogueado;
        
       if (!errores.isEmpty()){
            return res.render('users/editar_profile',{
                mensajesError:errores.mapped(),
                oldData: req.body, usuario: usuarioEditado})
        } 

        let nuevoUsuario=[];

        usuarios.forEach(usuario =>{

        if(usuario.id == usuarioEditado.id){
            usuario ={
                ...usuarioEditado,
                ...req.body,
            }
        }
        nuevoUsuario.push(usuario)
        })

        fs.writeFileSync(rutaUsuarios, JSON.stringify(nuevoUsuario, null))
        res.redirect('/usuario/profile');
    },

    editar: (req,res)=>{
        let usuario = req.session.usuarioLogueado;
        res.render('users/editar_profile',{usuario, toThousand});
        
    },

    crear: (req,res)=>{
        let errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('users/register',{
                mensajesError:errores.mapped(),
                oldData: req.body})
        }

        if (req.body.password != req.body.confirmarContraseña){
            return res.render('users/register',{mensajesError:{confirmarContraseña:{msg:"No coinciden las contraseñas"}}, oldData: req.body})
        }  

        if (usuarios.find(usuario => usuario.correo == req.body.correo)){
            return res.render('users/register',{mensajesError:{correo:{msg:"El correo ya se encuentra registrado"}}, oldData: req.body})
        }

        let allUsers = [...usuarios];
        if (usuarios.length > 0){
            id = allUsers.pop().id + 1
        } else { id=1 };
        
        let nuevoUsuario = {...req.body}
        delete nuevoUsuario.terminos;
        delete nuevoUsuario.confirmarContraseña;

        let nuevaDBUsuarios = usuarios;
        nuevaDBUsuarios[usuarios.length] = {
            id: id,
            ...nuevoUsuario,
            password: bcryptjs.hashSync(req.body.password,10)

        };

        fs.writeFileSync(rutaUsuarios,JSON.stringify(nuevaDBUsuarios, null, ' '));
        res.redirect('/usuario/login');
    },

    logout: (req,res) => {
        req.session.destroy(); 
        res.clearCookie('emailUsuario');
        res.redirect('/')
    }
    
   
};
//

module.exports = usuariosController;