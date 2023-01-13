window.onload = () => {
    let formulario = document.querySelector('form.formularioLogin');
    let imagenes = document.querySelectorAll('.imagen');
    const extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;

    formulario.titulo.focus();
    formulario.onsubmit = (event) => {
        let errores = [];
        if (formulario.titulo.value == '') {
            errores.push('El campo título es obligatorio.')
        };
        if (formulario.titulo.value.length < 5) {
            errores.push('El campo título debe tener al menos 5 caracteres')
        };
        if (formulario.descripcion.value.length < 20) {
            errores.push('El campo descripción debe tener al menos 20 caracteres')
        };
        if (formulario.precio.value == '') {
            errores.push('El campo precio es obligatorio.')
        };
        if (formulario.tarifa.value == '') {
            errores.push('El campo tarifa es obligatorio.')
        };

        for (let i = 0; i < imagenes.length; i++) {
            if (imagenes[i].value == '') {

            } else if (!extensionesPermitidas.exec(imagenes[i].value)) {
                errores.push('Las extensiones permitidas para imagenes son .jpg, .jpeg, .png, .gif');
                break
            }
        };

        console.log(errores);
        if (errores.length > 0) {
            event.preventDefault();

            let listaErrores = document.querySelector('div.errores ul')
            errores.forEach(error => listaErrores.innerHTML += '<li>' + error + '</li>')
        }

        let ulErrores = document.querySelector(".errores ul");

        while (ulErrores.hasChildNodes()) {
            ulErrores.removeChild(ulErrores.firstChild);
        };
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>${error}</li>`
        });
    }
}
