
window.onload = () => {
    let ImagenesServicio = document.querySelectorAll('.imagenServicio');

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
        }})  
    }


    
