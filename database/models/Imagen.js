module.exports = function(sequelize, dataTypes){

    let alias = 'Imagen'; 

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

        url: {
            type: dataTypes.STRING(200)
        }
    }

    let config = {
        tableName: 'imagenes',
        timestamps: false
    }

   let Imagen = sequelize.define(alias, cols, config); 

}