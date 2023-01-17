const db = require('../../database/models');

const serviciosAPIController = {
    lista: async (req, res) => {
        let servicios = await db.Servicio.findAll({include: ['imagenes', 'categoria']});

        let { count, rows } = await db.Servicio.findAndCountAll({include: ['categoria'], group: 'idCategoria'});
        
        let countByCategory = {};
        rows.forEach((value, i )=> {
            countByCategory[value.categoria.categoria] = count[i].count;
        });

        servicios.forEach( servicio => {
            servicio.dataValues["url"] = `http://localhost:3050/api/servicios/${servicio.id}`;
        });

        let respuesta = {
            meta: {
                status: 200,
                url: 'api/servicios',
            },
            count: servicios.length,
            countByCategory,
            servicios
        };
        res.json(respuesta);
    },
    detalle: async (req, res) => {
        let servicio = await db.Servicio.findByPk(req.params.id,
            { include: ['imagenes', 'preguntas', 'calificaciones','visitacontactoservicios'] });

        let respuesta = {
            meta: {
                status: 200,
                url: `api/servicios/id`,
            },
            servicio
        };
        res.json(respuesta)
    }
}

module.exports = serviciosAPIController;