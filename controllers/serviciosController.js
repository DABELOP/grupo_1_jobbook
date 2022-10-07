const fs = require('fs');
const path = require('path');


const rutaServicios = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(rutaServicios, 'utf-8'));

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));

const serviciosController = {
    detalleServicio: (req,res)=>{
        let servicio = servicios.find(servicio => servicio.id == req.params.id)
        let usuario = usuarios.find(usuario => usuario.id == servicio.idUsuario)
        res.render('services/detalle_servicio',{servicio,usuario});
    },

    contacto: (req,res)=>{
        res.render('services/contacto_experto');
    },

    busqueda: (req,res)=>{  
        res.render('services/busqueda_servicios',{servicios, usuarios});
    },

    crear: (req,res)=>{
        res.render('services/crear_servicio');
    },
    guardar: (req, res) => {
        
    }
};

module.exports = serviciosController;