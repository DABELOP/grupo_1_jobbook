const serviciosController = {
    detalleServicio: (req,res)=>{
        res.render('detalle_servicio');
    },
    busqueda: (req,res)=>{
        res.render('busqueda_servicios');
    },
    crear: (req,res)=>{
        res.render('crear_servicio');
    }
};

module.exports = serviciosController;