module.exports = function(sequelize, dataTypes){

    let alias = 'Visitacontactoservicio'; 

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

        idUsuario:{
            type: dataTypes.INTEGER.UNSIGNED
        },

        fecha: {
            type: dataTypes.INTEGER.UNSIGNED
        }
    }

    let config = {
        tableName: 'visitascontactoservicios',
        timestamps: false
    }


   let Visitacontactoservicio = sequelize.define(alias, cols, config);

   Visitacontactoservicio.associate = function(models){

        Visitacontactoservicio.belongsTo(models.Servicio,{
            as: 'servicio',
            foreignKey:'idServicio'
        }),

        
        Visitacontactoservicio.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey:'idUsuario'
        })

    }
    

    return Visitacontactoservicio;
    
    }

