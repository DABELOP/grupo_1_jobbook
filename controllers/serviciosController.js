const fs = require('fs');
const path = require('path');


const rutaServicios = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(rutaServicios, 'utf-8'));

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(rutaUsuarios, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const serviciosController = {
    detalleServicio: (req,res)=>{
        let servicio = servicios.find(servicio => servicio.id == req.params.id);
        let usuario = usuarios.find(usuario => usuario.id == servicio.idUsuario);
        res.render('services/detalle_servicio',{servicio,usuario,toThousand});
    },

    contacto: (req,res)=>{
        res.render('services/contacto_experto');
    },

    busqueda: (req,res)=>{  
        let serviciosBuscados=servicios.filter(servicio => servicio.titulo.includes(req.query.keywords));
        if (req.query.keywords == "") serviciosBuscados=[];
        res.render('services/busqueda_servicios',{serviciosBuscados, usuarios, toThousand});
    },

    crear: (req,res)=>{
        res.render('services/crear_servicio');
    },
    guardar: (req, res) => {
        let imagenes;
		if(req.files[0] != undefined){
			imagenes = req.files.map(file => file.filename);
		} else {
			imagenes = ["imagen-principal.jpg","miniatura-1.jpg","miniatura-2.jpg","miniatura-3.jpg"]
		}
        console.log(imagenes);
		let nuevoServicio = {
			id: servicios[servicios.length - 1].id + 1,
			...req.body,
			imagenes: imagenes
		};
		servicios.push(nuevoServicio);
		fs.writeFileSync(rutaServicios, JSON.stringify(servicios, null))
		res.redirect('/')
    },
    
};

module.exports = serviciosController;