window.onload = () => {
    let formulario = document.querySelector('form.formularioLogin');

    formulario.titulo.focus();
    formulario.onsubmit = (event) =>{
        let errores = [];
        if (formulario.titulo.value == ''){
            errores.push('El campo título es obligatorio.')
        };
        if (formulario.titulo.value.length < 5 ){
            errores.push('El campo título debe tener al menos 5 caracteres')
        };
        if (formulario.descripcion.value.length < 20 ){
            errores.push('El campo descripción debe tener al menos 20 caracteres')
        };
        if (formulario.precio.value == ''){
            errores.push('El campo precio es obligatorio.')
        };
        if (formulario.tarifa.value == ''){
            errores.push('El campo tarifa es obligatorio.')
        };

        console.log(errores);
        if (errores.length > 0){
            event.preventDefault();

            let listaErrores = document.querySelector('div.errores ul')
            errores.forEach(error => listaErrores.innerHTML += '<li>'+error+'</li>')
        }
        
    }
};