const serviciosController = {
    detalleServicio: (req,res)=>{
        res.render('services/detalle_servicio');
    },

    contacto: (req,res)=>{
        res.render('services/contacto_experto');
    },

    busqueda: (req,res)=>{
        let servicios = [
            {
                titulo:"Remodelación y adecuación de espacios interiores y exteriores",
                foto:"/images/fotoPerfil.jpg",
                nombre:"Melisa Lopez",
                ciudad:"Medellin",
                precio:"$49.900",
                trabajosRealizados:"54",
                calificacion:"/images/estrellas/5-estrella.png",
                tarifa:"Tarifa por hora",
                descripcion:" Diseño de Interiores con áreas clave como diseño de espacios, iluminación, paisajismo y decoración, hacemos de tu espacio un mejor lugar para vivir"
            },

            {
                titulo:"Remodelación de espacios diseño interior",
                foto:"/images/fotoPerfil4.jpg",
                nombre:"Andres Lopez",
                ciudad:"Envigado",
                precio:"$42.900",
                trabajosRealizados:"25",
                calificacion:"/images/estrellas/3-estrella.png",
                tarifa:"Tarifa por hora",
                descripcion:"Diseño de Interiores con áreas clave como diseño de espacio Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellat enim culpa veritatis expedita quos aut iure odit dolores ullam "
            },

            {
                titulo:"Remodelación y adecuación de oficinas y centros de trabajo",
                foto:"/images/fotoPerfil2.jpg",
                nombre:"Andrea Patiño",
                ciudad:"Sabaneta",
                precio:"$35.500",
                trabajosRealizados:"14",
                calificacion:"/images/estrellas/4-estrella.png",
                tarifa:"Tarifa por hora",
                descripcion:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta perferendis obcaecati totam? Quo ea atque illo, beatae molestias tenetur quam alias facere vero porro quasi repellendus sapiente delectus dolorum at."
            },

            {
                titulo:"Remodelación de locales comerciales y decoración",
                foto:"/images/fotoPerfil3.jpg",
                nombre:"Oscar Herrera",
                ciudad:"Medellin",
                precio:"$69.900",
                trabajosRealizados:"62",
                calificacion:"/images/estrellas/5-estrella.png",
                tarifa:"Tarifa por hora",
                descripcion:"Diseño de Interiores con áreas clave como diseño de espacios, iluminación, paisajismo y decoración, hacemos de tu espacio un mejor lugar para vivir"
            },

            {
                titulo:"Remodelación y diseño exterior de viviendas campestres",
                foto:"/images/fotoPerfil5.jpg",
                nombre:"Antonio Lopez",
                ciudad:"Bello",
                precio:"$52.900",
                trabajosRealizados:"12",
                calificacion:"/images/estrellas/5-estrella.png",
                tarifa:"Tarifa por hora",
                descripcion:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta repellat fuga laborum tempora, ratione eaque beatae provident debitis? Quo delectus deserunt aut dolor quae nemo facere repellat eaque velit quam."
            }
        ]   
        res.render('services/busqueda_servicios',{'servicios': servicios});
    },

    crear: (req,res)=>{
        res.render('services/crear_servicio');
    }
};

module.exports = serviciosController;