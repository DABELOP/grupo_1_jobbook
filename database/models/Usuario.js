module.exports = function(sequelize, dataTypes){

    let alias = 'Usuario'; 

    let cols = {
         id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
 
        nombreCompleto:{
            type: dataTypes.STRING
        },

        fotoPerfil: {
            type: dataTypes.STRING
        },

        nombrePersonalizado: {
            type: dataTypes.STRING
        },

        ciudad: {
            type:dataTypes.STRING
        },

        correo: {
            type: dataTypes.STRING
        },

        password: {
            type: dataTypes.STRING
        },

        celular: {
            type: dataTypes.STRING
        },

        tipoDocumento: {
            type: dataTypes.STRING
        },

        numeroDocumento: {
            type: dataTypes.STRING
        },

        numeroDocumento: {
            type: dataTypes.STRING
        },

        fechaRegistro: {
            type: dataTypes.STRING
        }, 

    }

    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

   let Usuario = sequelize.define(alias, cols, config); 


  Usuario.associate = function(models){

        Usuario.hasMany(models.Servicio,{
            as: 'servicios',
            foreignKey:'idUsuario'
        }),
    
        Usuario.hasMany(models.Calificacion,{
            as: 'calificaciones',
            foreignKey:'idUsuario'
        }),
    
        Usuario.hasMany(models.Experiencia,{
            as: 'experiencias',
            foreignKey:'idUsuario'
        }),
    
        Usuario.hasMany(models.Habilidad,{
            as: 'habilidades',
            foreignKey:'idUsuario'
        }),

        Usuario.hasMany(models.Pregunta,{
            as: 'preguntas',
            foreignKey:'idUsuario'
        }),

        Usuario.hasMany(models.Visitacontactoservicio,{
            as: 'visitacontactoservicios',
            foreignKey:'idUsuario'
        }),

        Usuario.hasMany(models.Calificacion,{
            as: 'calificacion',
            foreignKey:'idUsuario'
        }) 

   } 

   return Usuario;

}