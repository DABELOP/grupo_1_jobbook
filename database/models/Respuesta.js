module.exports = function(sequelize, dataTypes){

    let alias = 'Respuesta'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        idPregunta:{
            type: dataTypes.INTEGER.UNSIGNED
        },

        respuesta: {
            type: dataTypes.TEXT
        },

        fecha: {
            type: dataTypes.DATEONLY
        },

        idUsuario:{
            type: dataTypes.INTEGER.UNSIGNED
        },

        idServicio:{
            type: dataTypes.INTEGER.UNSIGNED
        }
    }

    let config = {
        tableName: 'respuestas',
        timestamps: false
    }

   let Respuesta = sequelize.define(alias, cols, config); 

   Respuesta.associate = function(models){

    Respuesta.belongsTo(models.Pregunta,{
        as: 'pregunta',
        foreignKey:'idPregunta'
    }),

    Respuesta.belongsTo(models.Usuario,{
        as: 'usuario',
        foreignKey:'idUsuario'
    }),
    Respuesta.belongsTo(models.Servicio,{
        as: 'servicio',
        foreignKey:'idServicio'
    })


    }

   return Respuesta;

}