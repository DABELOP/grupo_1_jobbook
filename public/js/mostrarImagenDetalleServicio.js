window.onload = () => {
    let ImagenesServicio = document.querySelectorAll('.imagenMiniatura');

    ImagenesServicio.forEach(imagen => {
        imagen.onclick = () => {
            document.querySelector('.imagenPrincipal').src = imagen.src
        }})  
    }