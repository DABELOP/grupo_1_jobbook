window.onload = () => {
    let formulario = document.querySelector('form.formularioLogin');

    formulario.nombre.focus();
    formulario.onsubmit = (event) => {
        let errores = [];
        if (formulario.nombre.value == '') {
            errores.push('El campo nombre es obligatorio.')
        };
        if (formulario.correo.value.length < 4) {
            errores.push('El correo debe ser válido')
        };
        if (formulario.nombrePersonalizado.value.length < 3) {
            errores.push('El nombre personalizado debe tener al menos 3 caracteres')
        };
        if (formulario.password.value.length < 8) {
            errores.push('La contraseña debe tener al menos 8 caracteres')
        };
        if (formulario.confirmarContraseña.value != formulario.password.value) {
            errores.push('Las contraseñas no coinciden')
        };


        if (errores.length > 0) {
            event.preventDefault();

            let ulErrores = document.querySelector(".errores ul");
            while (ulErrores.hasChildNodes()) {
                ulErrores.removeChild(ulErrores.firstChild);
            };

            let listaErrores = document.querySelector('div.errores ul')
            errores.forEach(error => listaErrores.innerHTML += '<li>' + error + '</li>')
        }

    }
};