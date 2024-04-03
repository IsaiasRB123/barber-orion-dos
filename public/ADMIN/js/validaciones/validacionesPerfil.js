const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    passwordConfirmation: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    num: /^[1-9]\d*$/
}

const campos = {
    nombre: false,
    correo: false,
    telefono:false,
    edad:false,
    contrasena:false,
    confirmarContrasena:false,

}

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "telefono":
            ValidarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "correo":
            ValidarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "edad":
                ValidarCampo(expresiones.nombre, e.target, 'edad');
            break;
        case "contrasena":
                ValidarCampo(expresiones.telefono, e.target, 'contrasena');
            break;
        case "confimarContrasena":
                ValidarCampo(expresiones.correo, e.target, 'confimarContrasena');
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
    if (campos.nombre && campos.telefono && campos.correo && campos.edad && campos.contrasena && campos.confirmarContrasena) {
        formulario.reset();
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Cliente registrado correctamente",
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
