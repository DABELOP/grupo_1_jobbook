window.onload = () => {
   
//Agregar experiencias 
    document.querySelector('.agregarExperienciaBtn').onclick = () => {
        let nuevo = document.querySelector(".agregarExperiencia");
        let nuevaExperiencia = nuevo.cloneNode(true);
        nuevaExperiencia.querySelector('p').innerHTML = ('')
        document.querySelector('.inputsExperiencia').appendChild(nuevaExperiencia);
    }
//Eliminar experiencias
    let experienciasPrevias = document.querySelectorAll('.experienciasPrevias')
    experienciasPrevias.forEach(experiencia => {
        experiencia.querySelector('.eliminarExperienciaBtn').onclick = () => {
            if(confirm("¿Esta seguro que desea eliminar esta experiencia?")){
                experiencia.remove();
            }
        }
    })

//agregar habilidades
    document.querySelector('.agregarHabilidadBtn').onclick = () => {
        let nuevo = document.querySelector(".agregarHabilidad");
        let nuevaExperiencia = nuevo.cloneNode(true);
        nuevaExperiencia.querySelector('p').innerHTML = ('')
        document.querySelector('.inputsHabilidades').appendChild(nuevaExperiencia);
    }

//Eliminar habilidades
let habilidadesPrevias = document.querySelectorAll('.habilidadesPrevias')
habilidadesPrevias.forEach(habilidad => {
    habilidad.querySelector('.eliminarHabilidadBtn').onclick = () => {
    if(confirm("¿Esta seguro que desea eliminar esta habilidad?")){
        habilidad.remove();
    }
}
})



 

    /*  let ImagenesServicio = document.querySelectorAll('.imagenServicio');
 
     ImagenesServicio.forEach(imagen => {
         imagen.querySelector('.eliminarImagen').onclick = () => {
             let confirmar = confirm("¿Esta seguro que desea eliminar esta imagen?");
             if (confirmar) {
             if (document.querySelector('.borrarImagenes').value != ""){
             document.querySelector('.borrarImagenes').value += ','+ imagen.querySelector('img').className      
             } else {document.querySelector('.borrarImagenes').value +=  imagen.querySelector('img').className }
              imagen.querySelector('img').remove()
              imagen.querySelector('.eliminarImagen').innerHTML = ''
              imagen.querySelector('.imagenNueva').style.display = 'block'
             }
         }})   */
}

