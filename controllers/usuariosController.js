const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const verificarMail = require('../middlewares/verificacionEmail')


const usuariosController = {
    login: (req, res) => {
        res.clearCookie('emailUsuario');
        res.render('users/login');
    },

    loginProcess: (req, res) => {
        db.Usuario.findOne({
            where: { correo: req.body.correo },
        })
            .then(usuarioLogin => {

                if (usuarioLogin) {

                    if (bcryptjs.compareSync(req.body.password, usuarioLogin.password)) {
                        req.session.usuarioLogueado = usuarioLogin;
                        if (req.body.recordarme) {
                            res.cookie('emailUsuario', req.body.correo, { maxAge: 1000 * 60 * 60 })
                        }

                        if (req.session.ultimoServicio) {
                            return res.redirect('/servicio/' + req.session.ultimoServicio)
                        }
                        return res.redirect('/')
                    }
                }
                return res.render('users/login', { errores: { password: { msj: "Usuario o contraseña incorrectos" } } })

            })

    },

    register: (req, res) => {
        res.render('users/register');
    },
    contacto: (req, res) => {
        res.render('users/contacto_experto');
    },
    profile: async (req, res) => {
        let usuario = await Promise.resolve(db.Usuario.findByPk(req.session.usuarioLogueado.id,
            { include: ['experiencias', 'habilidades'] }));
        res.render('users/profile', { usuario, toThousand });
    },
    misServicios: async (req, res) => {
        let serviciosUsuario = await Promise.resolve(
            db.Servicio.findAll({ where: { idUsuario: req.session.usuarioLogueado.id } })
        );
        let usuario = await Promise.resolve(
            db.Usuario.findOne({ where: { id: req.session.usuarioLogueado.id } })
        );
        res.render('users/mis_servicios', { usuario, serviciosUsuario, toThousand });
    },
    guardarEdicion: async (req, res) => {
        let errores = validationResult(req);
        let usuarioEditado = await Promise.resolve(db.Usuario.findByPk(req.session.usuarioLogueado.id,
            { include: ['experiencias', 'habilidades'] }));

        if (!errores.isEmpty()) {
            return res.render('users/editar_profile', {
                mensajesError: errores.mapped(),
                oldData: req.body, usuario: usuarioEditado
            })
        }

       
        //EDICION EXPERIENCIA
        db.Experiencia.destroy({ where: { idUsuario: req.session.usuarioLogueado.id } })

        if (Array.isArray(req.body.experiencia)) {
            for (let i = 0; i < req.body.experiencia.length; i++) {
                db.Experiencia.create({
                    idUsuario: req.session.usuarioLogueado.id,
                    experiencia: req.body.experiencia[i]
                })
            }
        } else if(req.body.experiencia != ""){
            db.Experiencia.create({
                idUsuario: req.session.usuarioLogueado.id,
                experiencia: req.body.experiencia
            })
        }

        if (Array.isArray(req.body.experienciaNueva)) {
            for (let i = 0; i < req.body.experienciaNueva.length; i++) {
                db.Experiencia.create({
                    idUsuario: req.session.usuarioLogueado.id,
                    experiencia: req.body.experienciaNueva[i]
                })
            }
        } else if(req.body.experienciaNueva != ""){
            db.Experiencia.create({
                idUsuario: req.session.usuarioLogueado.id,
                experiencia: req.body.experienciaNueva
            })
        }

        //EDICION HABILIDADES

        db.Habilidad.destroy({ where: { idUsuario: req.session.usuarioLogueado.id } })

        if (Array.isArray(req.body.habilidad)) {
            for (let i = 0; i < req.body.habilidad.length; i++) {
                db.Habilidad.create({
                    idUsuario: req.session.usuarioLogueado.id,
                    habilidad: req.body.habilidad[i]
                })
            }
        } else if(req.body.habilidad != ""){
            db.Habilidad.create({
                idUsuario: req.session.usuarioLogueado.id,
                habilidad: req.body.habilidad
            })
        }

        if (Array.isArray(req.body.habilidadNueva)) {
            for (let i = 0; i < req.body.habilidadNueva.length; i++) {
                db.Habilidad.create({
                    idUsuario: req.session.usuarioLogueado.id,
                    habilidad: req.body.habilidadNueva[i]
                })
            }
        } else if(req.body.habilidadNueva != ""){
            db.Habilidad.create({
                idUsuario: req.session.usuarioLogueado.id,
                habilidad: req.body.habilidadNueva
            })
        }

        db.Usuario.update({
            nombrePersonalizado: req.body.nombrePersonalizado,
            nombreCompleto: req.body.nombre,
            tipoDocumento: req.body.tipoDocumento,
            numeroDocumento: req.body.numeroDocumento,
            celular: req.body.celular,
            ciudad: req.body.ciudad,
            fotoPerfil: req.files[0] ? req.files[0].filename : usuarioEditado.fotoPerfil
        },
            {
                where: {
                    id: usuarioEditado.id
                }
            }).then(usuario => {
                res.redirect('/usuario/profile');
            })
    },
    

    editar: async (req, res) => {
        let usuario = await Promise.resolve(db.Usuario.findByPk(req.session.usuarioLogueado.id,
            { include: ['experiencias', 'habilidades'] }));

        res.render('users/editar_profile', { usuario, toThousand });

    },

    verificacion: async (req, res) => {

        if (req.body.codigo != req.session.claveRegistro) {
            return res.render('users/verificacionCorreo', { mensajesError: { confirmarCodigo: { msg: "El codigo es invalido" } } })
        }

        db.Usuario.create(req.session.usuarioRegistro) 
        .then(resultado =>{
            req.session.destroy();
            res.redirect('/usuario/login')
        })
    },

    crear: async (req, res) => {

        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.render('users/register', {
                mensajesError: errores.mapped(),
                oldData: req.body
            })
        }

        if (req.body.password != req.body.confirmarContraseña) {
            return res.render('users/register', { mensajesError: { confirmarContraseña: { msg: "No coinciden las contraseñas" } }, oldData: req.body })
        }

        if (await db.Usuario.findOne({ where: { correo: req.body.correo } })) {
            return res.render('users/register', { mensajesError: { correo: { msg: "El correo ya se encuentra registrado" } }, oldData: req.body })
        }
        req.session.usuarioRegistro={
            fotoPerfil: 'imagen-default.jpg',
            nombreCompleto: req.body.nombre,
            correo: req.body.correo,
            nombrePersonalizado: req.body.nombrePersonalizado,
            password: bcryptjs.hashSync(req.body.password, 10)
        }

         min = Math.ceil(100000);
         max = Math.floor(999999);
        req.session.claveRegistro = Math.floor(Math.random() * (max - min) + min);

        verificarMail(req.body.correo, req.body.nombre, req.session.claveRegistro)
        
        res.render('users/verificacionCorreo');
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('emailUsuario');
        res.redirect('/')
    },

    password: (req, res) => {
        res.render('users/cambiar_password')
    },

    cambiarPassword: async (req, res) => {
        let usuario = await Promise.resolve(db.Usuario.findByPk(req.session.usuarioLogueado.id))

        if (bcryptjs.compareSync(req.body.password, usuario.password) && (req.body.nuevaPassword == req.body.confirmarPassword)) {
            db.Usuario.update({
                ...usuario,
                password: bcryptjs.hashSync(req.body.nuevaPassword, 10)
            },
                {
                    where: {
                        id: usuario.id
                    }
                }).then(usuario => {
                    return res.redirect('/usuario/login')
                }
                )

        } else {
            console.log('Entro aca')
            //return res.redirect('/usuario/profile/editar/password')
            return res.render('users/cambiar_password', { errores: { password: { msj: "Las contraseñas no coinciden" } } })
        }


    }

};

module.exports = usuariosController;