module.exports = function(sequelize, dataTypes){

    let alias = 'Calificacion'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        idServicio:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },

        calificacion: {
            type: dataTypes.INTEGER
        },

        comentario: {
            type: dataTypes.TEXT
        },

        fecha: {
            type:dataTypes.DATEONLY
        }

    }

    let config = {
        tableName: 'calificaciones',
        timestamps: false
    }

   let Calificacion = sequelize.define(alias, cols, config); 


   Calificacion.associate = function(models){

        Calificacion.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey:'idUsuario'
        }),

        Calificacion.belongsTo(models.Servicio,{
            as: 'servicio',
            foreignKey:'idServicio'
        });
 }

 return Calificacion;

}

