module.exports = function(sequelize, dataTypes){

    let alias = 'Pregunta'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        idServicio:{
            type: dataTypes.INTEGER.UNSIGNED
        },

        pregunta: {
            type: dataTypes.TEXT
        },

        fecha: {
            type: dataTypes.DATEONLY
        },

        idUsuario:{
            type: dataTypes.INTEGER.UNSIGNED
        }

    }

    let config = {
        tableName: 'preguntas',
        timestamps: false
    }

   let Pregunta = sequelize.define(alias, cols, config); 

}