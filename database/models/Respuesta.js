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
        }
    }

    let config = {
        tableName: 'respuestas',
        timestamps: false
    }

   let Respuesta = sequelize.define(alias, cols, config); 

}