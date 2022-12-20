const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');


const rutaServicios = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(rutaServicios, 'utf-8'));

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));
const db = require('../database/models');
const Usuario = require('../database/models/Usuario');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const serviciosController = {
    detalleServicio: (req, res) => {
        db.Servicio.findOne({
            where: { id: req.params.id },
            include: ['usuario', 'imagenes']
        })
            .then(servicio => {
                console.log(servicio);
                res.render('services/detalle_servicio', { servicio, toThousand });
            })
        //let servicio = servicios.find(servicio => servicio.id == req.params.id);
        //let usuario = usuarios.find(usuario => usuario.id == servicio.idUsuario);

    },

    contacto: (req, res) => {
        let servicio = servicios.find(servicio => servicio.id == req.params.id);
        let usuario = usuarios.find(usuario => usuario.id == servicio.idUsuario);
        res.render('services/contacto_experto', { usuario, servicio, toThousand });
    },

    busqueda: async (req, res) => {

        db.Servicio.findAll({
            include: 'usuario',/*[{
            model: Usuario,
            as: 'usuarios' 
          }] ,*/
            /* raw: true, */
            where: { titulo: { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' } } //PONER EL INCLUDE 
        })
            .then(servicios => {

                //let servicios = JSON.parse(JSON.stringify(serviciosBuscados, null, 2));
               servicios.forEach(servicio => {

                    let sumatoria = 0
                    let serviciosParaEnviar = []

                    db.Calificacion.findAll({
                        where: { idUsuario: servicio.idUsuario }

                    }).then((data) => {
                        
                        data.forEach(review => sumatoria += review.calificacion)
                        sumatoria = sumatoria / data.length;
                        let servicioViejo = servicio

                        servicio = {
                            ...servicio,
                            numeroCalificaciones: data.length,
                            promedioCalificaciones: sumatoria
                        }
                       
                        serviciosParaEnviar.push(servicio)
                            
                        if (servicios[servicios.length-1] == servicioViejo) { 
                            console.log(serviciosParaEnviar) 
                            res.render('services/busqueda_servicios', { serviciosBuscados: serviciosParaEnviar, toThousand });
                        }

                    })  

                });

                //console.log(reviews)

                /* async function getCalificaciones(){ 
                   let calificaciones = await db.Calificacion.findAll({
                   where: { idUsuario: servicio.idUsuario }
                   });
                 return calificaciones
               }; 
*/
                //console.log(getCalificaciones())
                //let calificaciones = getCalificaciones().then(result => result);
                // let calificaciones = getCalificaciones(); 
                //console.log(getCalificaciones()); 

                //calificaciones.forEach(calificacion => sumatoriaCalificaciones += calificacion.calificacion)






               // res.render('services/busqueda_servicios', { serviciosBuscados: servicios, toThousand });
            })/* .then(data =>{
                console.log(data)
            }); */
    },

    filtrarPorCategoria: (req, res) => {
        /* let serviciosBuscados=servicios.filter(servicio => servicio.categoria == req.query.keywords);
        console.log(serviciosBuscados);
        if (req.query.keywords == "") serviciosBuscados=[];
        res.render('services/busqueda_servicios',{serviciosBuscados, usuarios, toThousand}); */
        db.Servicio.findAll({
            include: ['usuario'],
            where: { categoria: { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' } }  //PONER EL INCLUDE 
        })
            .then(serviciosBuscados => {
                console.log(serviciosBuscados)
                console.log(usuarios)
                res.render('services/busqueda_servicios', { serviciosBuscados, usuarios, toThousand });
            })

    },

    crear: (req, res) => {
        res.render('services/crear_servicio');
    },

    editar: (req, res) => {
        let servicio = servicios.find(servicio => servicio.id == req.params.idServicio);
        res.render('services/editar_mi_servicio', { servicio, toThousand });

    },

    guardar: (req, res) => {
        let imagenes;
        if (req.files[0] != undefined) {
            imagenes = req.files.map(file => file.filename);
        } else {
            imagenes = ["imagen-principal.jpg", "miniatura-1.jpg", "miniatura-2.jpg", "miniatura-3.jpg"]
        }
        let nuevoServicio = {
            id: servicios[servicios.length - 1].id + 1,
            ...req.body,
            idUsuario: req.session.usuarioLogueado.id,
            imagenes: imagenes
        };
        servicios.push(nuevoServicio);
        fs.writeFileSync(rutaServicios, JSON.stringify(servicios, null))
        res.redirect('/')
    },

    guardarEdicion: (req, res) => {
        let servicioEditado = servicios.find(servicio => servicio.id == req.params.idServicio);
        let idUsuario = servicioEditado.idUsuario
        let nuevosServicios = []


        servicios.forEach(servicio => {

            if (servicio.id == servicioEditado.id) {
                servicio = {
                    ...servicioEditado,
                    ...req.body,
                }
            }
            nuevosServicios.push(servicio)
        })

        fs.writeFileSync(rutaServicios, JSON.stringify(nuevosServicios, null))

        res.redirect('/usuario/profile/' + idUsuario + '/servicios');
    },

    eliminar: (req, res) => {

        let servicioEliminar = servicios.find(servicio => servicio.id == req.params.idServicio);
        let idUsuario = servicioEliminar.idUsuario
        let nuevosServicios = servicios.filter(servicio => servicio.id != servicioEliminar.id);
        fs.writeFileSync(rutaServicios, JSON.stringify(nuevosServicios, null))

        res.render('/usuario/profile/' + idUsuario + '/servicios');
    }


};

module.exports = serviciosController;