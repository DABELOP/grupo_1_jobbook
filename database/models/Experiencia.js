module.exports = function(sequelize, dataTypes){

    let alias = 'Experiencia'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        idUsuario:{
            type: dataTypes.INTEGER.UNSIGNED
        },

        experiencia: {
            type: dataTypes.STRING(300)
        }
    }

    let config = {
        tableName: 'experiencia',
        timestamps: false
    }

   let Experiencia = sequelize.define(alias, cols, config); 

   Experiencia.associate = function(models){
        Experiencia.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey:'idUsuario'
        });
    }

    return Experiencia;

}