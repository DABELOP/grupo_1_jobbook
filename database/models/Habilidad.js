module.exports = function(sequelize, dataTypes){

    let alias = 'Habilidad'; 

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

        habilidad: {
            type: dataTypes.STRING(200)
        }
    }

    let config = {
        tableName: 'habilidades',
        timestamps: false
    }

   let Habilidad = sequelize.define(alias, cols, config); 

   Habilidad.associate = function(models){
        Habilidad.belongsTo(models.Usuario,{
            as: 'usuario',
            foreignKey:'idUsuario'
        });
    }

   return Habilidad; 

}