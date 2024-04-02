const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precio: /^(?:[1-9]|[1-9]\d+)(?:\.\d{1,2})?$/
}

const campos = {
    nombre: false,
    num: false,
    precio: false,
}

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "precio":
            ValidarCampo(expresiones.precio, e.target, 'precio');
            break;
    }
}

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
}

inputs.forEach((input) => {
    input.addEventListener('keyup', ValidarFormulario)
    input.addEventListener('blur', ValidarFormulario)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    if (campos.nombre && campos.precio) {
        formulario.reset();
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Servicio registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
        },5000)
    }
})
