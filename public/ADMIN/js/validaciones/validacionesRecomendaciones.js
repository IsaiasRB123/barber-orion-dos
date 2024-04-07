const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    descripcion: /^[a-zA-Z0-9\s\W]{10,}$/
};

const campos = {
    nombre: false,
    descripcion: false,
    imagen: false
};

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "descripcion":
            ValidarCampo(expresiones.descripcion, e.target, 'descripcion');
            break;
        case "imagen":
            ValidarImagen(e.target);
            break;
    }
};

const ValidarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('input-box-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('input-box-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

const ValidarImagen = (input) => {
    const fileInput = input.files[0];
    if (fileInput) {
        campos.imagen = true;
    } else {
        campos.imagen = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', ValidarFormulario);
    input.addEventListener('blur', ValidarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.nombre && campos.imagen && campos.descripcion) {
        formulario.reset();
        Swal.fire({
            icon: "success",
            title: "¡Se guardó correctamente!",
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