const db = require('../../database/models');
const sequelize = require('sequelize')

const usuariosAPIController = {
    lista: async (req, res) => {

        let usuarios = await db.Usuario.findAll( {attributes: ['id', 'nombreCompleto', 'correo', ]});

        usuarios.forEach(usuario => {
            usuario.dataValues["url"] = `http://localhost:3050/api/usuarios/${usuario.id}`;
        });

        let respuesta = {
            meta: {
                status: 200,
                url: 'api/usuarios',
            },
            count: usuarios.length,
            usuarios
        };
        res.json(respuesta);
    },


    detalle: async (req, res) => {
        let usuario = await db.Usuario.findByPk(req.params.id, {attributes: ['id', 'nombreCompleto', 'correo', 'fotoPerfil' ]});


        let respuesta = {
            meta: {
                status: 200,
                url: `api/usuarios/id`,
            },
            usuario
        };
        res.json(respuesta)
    }
}

module.exports = usuariosAPIController;