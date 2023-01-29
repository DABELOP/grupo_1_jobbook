const fs = require('fs');
const path = require('path');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));
const db = require('../database/models');
const Visitacontactoservicio = require('../database/models/Visitacontactoservicio');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const serviciosController = {

    detalleServicio: async (req, res) => {
       
        let servicio = await Promise.resolve(db.Servicio.findByPk(req.params.id,
            { include: ['usuario', 'imagenes', 'categoria', 'calificaciones','visitacontactoservicios'] }))

        let sugeridos = await Promise.resolve(db.Servicio.findAll({ where: { 
            idCategoria: servicio.idCategoria }, order:[['impresiones','DESC']],limit: 4, include: ['imagenes'] }))

        let usuario = await Promise.resolve(db.Usuario.findByPk(servicio.idUsuario,
            { include: ['calificaciones', 'experiencias', 'habilidades'] }))

        let preguntas = await Promise.resolve(db.Respuesta.findAll({ include: ['pregunta'], where: { idServicio: servicio.id } }))
        let preguntasSR = await Promise.resolve(db.Pregunta.findAll({ where: { idServicio: servicio.id } }))
        preguntasSR = preguntasSR.map(pregunta => {
            for (i = 0; i < preguntas.length; i++) {
                if (preguntas[i].idPregunta == pregunta.id) return
            }
            return pregunta
        })

        let promedioCalificacion = Math.round((usuario.calificaciones.reduce((accu, calificacion) =>
            accu + calificacion.calificacion, 0) / usuario.calificaciones.length))

        res.render('services/detalle_servicio', { servicio, usuario, promedioCalificacion, preguntas, preguntasSR, sugeridos, toThousand });
    },

    contacto: async (req, res) => {

        let servicio = await Promise.resolve(db.Servicio.findByPk(req.params.id));
        let usuario = await Promise.resolve(db.Usuario.findByPk(servicio.idUsuario, { include: ['calificaciones'] }));

        let promedioCalificacion = Math.round((usuario.calificaciones.reduce((accu, calificacion) =>
            accu + calificacion.calificacion, 0) / usuario.calificaciones.length))

        db.Visitacontactoservicio.create({
            idServicio: req.params.id,
            idUsuario: req.session.usuarioLogueado.id
        })

            .then(visita => console.log(visita))
            .catch(e => console.log(e));
       
        res.render('services/contacto_experto', { usuario, servicio, promedioCalificacion, toThousand });
    },

    busqueda: async (req, res) => {
        //FILTROS DE BUSQUEDA 
        let defectoCiudad = {  [db.Sequelize.Op.or]: [
            {[db.Sequelize.Op.like]: ['%a%']},{[db.Sequelize.Op.like]: ['%e%']},
            {[db.Sequelize.Op.like]: ['%i%']},{[db.Sequelize.Op.like]: ['%o%']},
            {[db.Sequelize.Op.like]: ['%u%']}
          ]}
        
        let numeros = []  
        let defectoNumero =  {[db.Sequelize.Op.or]: numeros}
          for (let i = 0 ; i<10 ; i++){
            numeros.push({[db.Sequelize.Op.like]: ['%'+i+'%']})
          }
        let minVal = req.query.min ? req.query.min: '';
        let maxVal = req.query.max ? req.query.max: '';  
        
        let min = req.query.min ? {[db.Sequelize.Op.gt]: [req.query.min]} : defectoNumero
        let max = req.query.max ? {[db.Sequelize.Op.lt]: [req.query.max]} : defectoNumero
        let ciudad = req.query.ciudad ? req.query.ciudad : defectoCiudad
        let orden = 'ASC'
        if (req.query.orden){
            if (req.query.orden == 'menor') orden ='ASC'
            if (req.query.orden == 'mayor') orden = 'DESC'
        } 

         let serviciosBuscados = await Promise.resolve(db.Servicio.findAll({
            include: ['usuario'],
            where: {   
              titulo: { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' },
             '$usuario.ciudad$':ciudad,
              precio:{[db.Sequelize.Op.and]: [min,max]}
            },
            order: [['precio', orden]],
        })) 

       let ciudades = []
       serviciosBuscados.forEach(servicio => {
        if (ciudades.indexOf(servicio.usuario.ciudad)<0) ciudades.push(servicio.usuario.ciudad)
        })
        
        //Todos los usuarios de los servicios buscados 
       let usuariosServicios = serviciosBuscados.map(servicio => ['idUsuario', servicio.idUsuario]);

        //Almacena los id de usuarios para la consulta en calificaciones
        let idUsuarios = []
        for (let i = 0; i < usuariosServicios.length; i++) {
            idUsuarios.push(Object.fromEntries([usuariosServicios[i]]))
        }

        //Busca todas las calificaciones relacionadas a los usuarios de los servicios buscados
        let calificaciones = await Promise.resolve(db.Calificacion.findAll(
            { where: { [db.Sequelize.Op.or]: idUsuarios } }))

        //Agrega el numero de calificaciones y el promedio a cada servicio del array 
        let servicios = serviciosBuscados.map(servicio => {
            let calificacionesUsuario = calificaciones.filter(calificacion => calificacion.idUsuario == servicio.idUsuario)
            let sumatoriaCalificaciones = calificacionesUsuario.reduce((accu, calificacion) => accu + calificacion.calificacion, 0)

            servicio = {
                ...servicio,
                numeroCalificaciones: calificacionesUsuario.length,
                promedioCalificaciones: Math.round(sumatoriaCalificaciones / calificacionesUsuario.length)
            }

            return servicio
        })

        res.render('services/busqueda_servicios', { serviciosBuscados: servicios, ciudades, minVal, maxVal,toThousand })
    },

    filtrarPorCategoria: async(req, res) => {
        let defectoCiudad = {  [db.Sequelize.Op.or]: [
            {[db.Sequelize.Op.like]: ['%a%']},{[db.Sequelize.Op.like]: ['%e%']},
            {[db.Sequelize.Op.like]: ['%i%']},{[db.Sequelize.Op.like]: ['%o%']},
            {[db.Sequelize.Op.like]: ['%u%']}
          ]}
        
        let numeros = []  
        let defectoNumero =  {[db.Sequelize.Op.or]: numeros}
          for (let i = 0 ; i<10 ; i++){
            numeros.push({[db.Sequelize.Op.like]: ['%'+i+'%']})
          }
        let minVal = req.query.min ? req.query.min: '';
        let maxVal = req.query.max ? req.query.max: '';  
        
        let min = req.query.min ? {[db.Sequelize.Op.gt]: [req.query.min]} : defectoNumero
        let max = req.query.max ? {[db.Sequelize.Op.lt]: [req.query.max]} : defectoNumero
        let ciudad = req.query.ciudad ? req.query.ciudad : defectoCiudad
        let orden = 'ASC'
        if (req.query.orden){
            if (req.query.orden == 'menor') orden ='ASC'
            if (req.query.orden == 'mayor') orden = 'DESC'
        } 

         let serviciosBuscados = await Promise.resolve(db.Servicio.findAll({
            include: ['usuario','categoria'],
            where: {   
            '$categoria.categoria$': { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' },
             '$usuario.ciudad$':ciudad,
              precio:{[db.Sequelize.Op.and]: [min,max]}
            },
            order: [['precio', orden]],
        })) 

       let ciudades = []
       serviciosBuscados.forEach(servicio => {
        if (ciudades.indexOf(servicio.usuario.ciudad)<0) ciudades.push(servicio.usuario.ciudad)
        })
        
        //Todos los usuarios de los servicios buscados 
       let usuariosServicios = serviciosBuscados.map(servicio => ['idUsuario', servicio.idUsuario]);

        //Almacena los id de usuarios para la consulta en calificaciones
        let idUsuarios = []
        for (let i = 0; i < usuariosServicios.length; i++) {
            idUsuarios.push(Object.fromEntries([usuariosServicios[i]]))
        }

        //Busca todas las calificaciones relacionadas a los usuarios de los servicios buscados
        let calificaciones = await Promise.resolve(db.Calificacion.findAll(
            { where: { [db.Sequelize.Op.or]: idUsuarios } }))

        //Agrega el numero de calificaciones y el promedio a cada servicio del array 
        let servicios = serviciosBuscados.map(servicio => {
            let calificacionesUsuario = calificaciones.filter(calificacion => calificacion.idUsuario == servicio.idUsuario)
            let sumatoriaCalificaciones = calificacionesUsuario.reduce((accu, calificacion) => accu + calificacion.calificacion, 0)

            servicio = {
                ...servicio,
                numeroCalificaciones: calificacionesUsuario.length,
                promedioCalificaciones: Math.round(sumatoriaCalificaciones / calificacionesUsuario.length)
            }

            return servicio
        })

        res.render('services/busqueda_servicios', { serviciosBuscados: servicios, ciudades, minVal, maxVal,toThousand })
        /* db.Servicio.findAll({
            include: ['usuario', 'categoria'],
            where: { '$categoria.categoria$': { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' } }  //PONER EL INCLUDE 
        })
            .then(serviciosBuscados => {
    
                res.render('services/busqueda_servicios', { serviciosBuscados, usuarios, toThousand });
            }) */
    },

    crear: (req, res) => {
        res.render('services/crear_servicio');
    },

    editar: async (req, res) => {
        let servicio = await Promise.resolve(
            db.Servicio.findByPk(req.params.idServicio, { include: 'imagenes' })
        );

        res.render('services/editar_mi_servicio', { servicio, toThousand });

    },

    guardar: async (req, res) => {
        let imagenes;
        if (req.files[0] != undefined) {
            imagenes = req.files.map(file => file.filename);
        } else {
            imagenes = ["default.jpg", "default.jpg", "default.jpg", "default.jpg"]
        };
        let categoria = await Promise.resolve(db.Categoria.findOne(
            {
                where: { categoria: req.body.categoria }
            }));
        let nuevoServicio = {
            titulo: req.body.titulo,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            tarifa: req.body.tarifa,
            idUsuario: req.session.usuarioLogueado.id,
            idCategoria: categoria.id
        };
        db.Servicio.create(nuevoServicio)
            .then(
                (servicio) => {
                    imagenes.forEach(imagen => {
                        db.Imagen.create({
                            idServicio: servicio.id,
                            url: imagen
                        })
                    })
                });

        res.redirect('/usuario/profile/servicios')
    },

    guardarEdicion: async (req, res) => {

        let imagenesEliminar = req.body.borrarImagenes.split(',')
        imagenesEliminar.forEach(imagen => {
            db.Imagen.destroy({ where: { url: imagen } })
                .then(resultado => console.log("Imagen eliminada de la DB"))
        })

        let imagenes;

        if (req.files[0] != undefined) {
            imagenes = req.files.map(file => file.filename);

            imagenes.forEach(imagen => {
                db.Imagen.create({
                    idServicio: req.params.idServicio,
                    url: imagen
                })
            })
        }

        let servicioEditado = await Promise.resolve(
            db.Servicio.findByPk(req.params.idServicio)
        );

        db.Servicio.update({
            ...servicioEditado,
            ...req.body
        },
            {
                where: {
                    id: req.params.idServicio
                }
            })
        .then(servicio => res.redirect('/usuario/profile/servicios'));
    },

    eliminar: (req, res) => {
        db.Servicio.destroy({ where: { id: req.params.idServicio } })
        res.redirect('/usuario/profile/servicios');
    },

    guardarPregunta: (req, res) => {

        if (req.session.usuarioLogueado) {
            db.Pregunta.create({
                idServicio: req.params.id,
                pregunta: req.body.pregunta,
                idUsuario: req.session.usuarioLogueado.id
            }).then(resp => {
                res.redirect('/servicio/' + req.params.id)
            })

        } else {
            req.session.ultimoServicio = req.params.id
            res.redirect('/usuario/login')
        }
    }


};

module.exports = serviciosController;