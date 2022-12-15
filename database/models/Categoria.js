module.exports = function(sequelize, dataTypes){

    let alias = 'Categoria'; 

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            unique:true
        },

        categoria:{
            type: dataTypes.STRING(100),
            allowNull:false
        }

    }

    let config = {
        tableName: 'categorias',
        timestamps: false
    }

   let Categoria = sequelize.define(alias, cols, config); 

   Categoria.associate = function(models){
    Categoria.hasMany(models.Servicio,{
        as: 'servicio',
        foreignKey:'idCategoria'
    });
}

return Categoria;
}