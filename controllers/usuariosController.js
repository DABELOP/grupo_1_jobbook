const bcryptjs = require('bcryptjs'); 
const {validationResult} = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
//const { emitWarning } = require('process');

const usuariosController = {
    login: (req,res)=>{
        res.render('users/login');
    },

    loginProcess: (req,res)=>{
        
        db.Usuario.findOne({
            where: {correo: req.body.correo},
            raw: true
        })
        .then(usuarioLogin => {
            
            if (usuarioLogin){
                
                let validacionContrasena = bcryptjs.compareSync(req.body.password, usuarioLogin.password);

                if (validacionContrasena) {
                    delete usuarioLogin.password
                    req.session.usuarioLogueado = usuarioLogin;
                
                    if (req.body.recordarme){
                        res.cookie('emailUsuario',req.body.correo, {maxAge:1000*60*60})
                    }
                    return res.redirect('/')
                }
            }
            return res.render('users/login',{errores:{password:{msj:"Usuario o contraseña incorrectos"}}})

        })

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

        db.Usuario.update({
          nombrePersonalizado: req.body.nombrePersonalizado,
          nombreCompleto: req.body.nombre,
          tipoDocumento: req.body.tipoDocumento,
          numeroDocumento: req.body.numeroDocumento,
          celular: req.body.celular,
          ciudad: req.body.ciudad            
        },
        {
          where:{
            id: usuarioEditado.id
          } 
        })
        
        res.redirect('/usuario/profile');
    },

    editar: (req,res)=>{
        let usuario = req.session.usuarioLogueado;
        console.log(usuario)
        res.render('users/editar_profile',{usuario, toThousand});
        
    },

    crear: async (req,res)=>{
        let errores = validationResult(req);

        if (!errores.isEmpty()){
            return res.render('users/register',{
                mensajesError:errores.mapped(),
                oldData: req.body})
        }

        if (req.body.password != req.body.confirmarContraseña){
            return res.render('users/register',{mensajesError:{confirmarContraseña:{msg:"No coinciden las contraseñas"}}, oldData: req.body})
        }  

        if ( await db.Usuario.findOne({where:{ correo: req.body.correo }})){
            return res.render('users/register',{mensajesError:{correo:{msg:"El correo ya se encuentra registrado"}}, oldData: req.body})
        }

       
        db.Usuario.create({
            nombreCompleto: req.body.nombre,
            correo: req.body.correo,
            nombrePersonalizado: req.body.nombrePersonalizado,
            password: bcryptjs.hashSync(req.body.password,10)
        })

        res.redirect('/usuario/login')
    },

    logout: (req,res) => {
        req.session.destroy(); 
        res.clearCookie('emailUsuario');
        res.redirect('/')
    }
    
   
};

module.exports = usuariosController;