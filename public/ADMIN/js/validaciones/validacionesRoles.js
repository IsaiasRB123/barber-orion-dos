const formulario = document.getElementById('formularioRoles');
const inputs = document.querySelectorAll('#formularioRoles input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
    nombre: false,
    // Agrega un campo para contabilizar los checkboxes seleccionados
    permisos: false
};

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, 'nombre');
            break;
    }
};

const ValidarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('input-box-correcto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('input-box-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-correcto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    }
};

// Agrega eventListeners para validar cambios en los inputs
inputs.forEach((input) => {
    if (input.type === 'text') {
        input.addEventListener('keyup', ValidarFormulario);
        input.addEventListener('blur', ValidarFormulario);
    } else if (input.type === 'checkbox') {
        input.addEventListener('change', () => {
            campos.permisos = document.querySelectorAll('#formularioRoles input[type="checkbox"]:checked').length > 0;
        });
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.nombre && campos.permisos) {
        formulario.reset();
        Swal.fire({
            icon: "success",
            title: "Cliente registrado correctamente",
            showConfirmButton: false,
            timer: 1500, 
            backdrop: false
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
});