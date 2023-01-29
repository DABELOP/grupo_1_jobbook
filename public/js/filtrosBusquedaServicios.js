
window.onload = () => {

    let min
    let max 
    let ciudad
    let orden
    let url = location.href

    let precioBtn = document.querySelector('.filtroPrecioBtn');
    let precioCBtn = document.querySelector('.filtroPrecioCBtn');
    let listaUbicaciones = document.querySelectorAll('.listaUbicaciones li');
    let ordenDesplegable = document.querySelector('#filtroDesplegable')
   

    listaUbicaciones.forEach(ubicacion => {
        ubicacion.onclick = () => {
            ciudad = ubicacion.innerHTML
            let query='&ciudad='
            if (ciudad == 'Todas'){
                eliminar(query)
            }else{
            reemplazar(query,ciudad)
            }
        }
    })

    precioBtn.onclick = () => {
        min = document.querySelector('#precioMinimoFiltro').value
        let querymin = '&min='
        if (min) reemplazar(querymin, min)
        max = document.querySelector('#precioMaximoFiltro').value  
        let querymax = '&max='  
        if (max) reemplazar(querymax, max)    
    }

    precioCBtn.onclick = () => {
        min = document.querySelector('#precioMinimoFiltro').value
        let querymin = '&min='
        max = document.querySelector('#precioMaximoFiltro').value  
        let querymax = '&max=' 
        eliminar(querymin)    
        eliminar(querymax)    
    }
        
     ordenDesplegable.onchange = () => {
        orden = ordenDesplegable.value
        let query = '&orden='
        reemplazar(query,orden)
    } 


  function reemplazar (query,filtro){
    url = location.href
    if (!location.href.includes(query)){
        location.href = url +query+filtro
    }else{
        let inicial = url.indexOf(query)
        let final = url.indexOf('&',inicial+1)
        if (final == -1) final = url.length+1
        let parametro = url.substring(inicial,final)
        nuevaUrl = url.replace(parametro,query+filtro)
        location.href = nuevaUrl
    }
  }

  function eliminar (query){
    url = location.href
    if (!location.href.includes(query)){
       location.href
    }else{
        let inicial = url.indexOf(query)
        let final = url.indexOf('&',inicial+1)
        if (final == -1) final = url.length+1
        let parametro = url.substring(inicial,final)
        nuevaUrl = url.replace(parametro,'')
        location.href = nuevaUrl
    }
    }
}

    
  