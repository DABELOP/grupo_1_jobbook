module.exports = function(sequelize, dataTypes){

    let alias = 'Servicio'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        idUsuario:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        },

        titulo: {
            type: dataTypes.STRING(200),
            allowNull:false
        },

        precio: {
            type: dataTypes.INTEGER,
            allowNull:false
        },

        descripcion: {
            type:dataTypes.TEXT,
            allowNull:false
        },

        tarifa: {
            type: dataTypes.STRING(200)
        },

        impresiones: {
            type: dataTypes.INTEGER
        },

        idCategoria: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: 'servicios',
        timestamps: false
    } 

   let Servicio = sequelize.define(alias, cols, config); 


   Servicio.associate = function(models){
    
        Servicio.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey:'idUsuario'
        }),
        Servicio.hasMany(models.Imagen,{
            as: 'imagenes',
            foreignKey:'idServicio'
        }),
        Servicio.hasMany(models.Visitacontactoservicio,{
            as: 'visitacontactoservicios',
            foreignKey:'idServicio'
        }),
        Servicio.hasMany(models.Pregunta,{
            as: 'preguntas',
            foreignKey:'idServicio'
        }),
        Servicio.belongsTo(models.Categoria,{
            as: 'categoria',
            foreignKey:'idCategoria'
        })
    }

    return Servicio; 

}