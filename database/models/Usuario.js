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
        timestaps: false
    }

   let Usuario = sequelize.define(alias, cols, config); 

}