const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    precio: /^(?:[1-9]|[1-9]\d+)(?:\.\d{1,2})?$/,
    num: /^[1-9]\d*$/,
}

const campos = {
    nombre: false,
    precio: false,
    num: false,
    fecha_venta: false,
    fecha_pago:false
}

const ValidarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            ValidarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "fecha_venta":
            ValidarFecha(e.target, 'fecha_venta');
            break;
        case "fecha_pago":
            ValidarFecha(e.target, 'fecha_pago');
            break;
    }
}

const ValidarFecha = (input, campo) => {
    if (input.value.trim() === '') {
        document.getElementById(`grupo__${campo}`).classList.add('input-box-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-correcto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('input-box-correcto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
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

})

function Guardado(id) {
    if (campos.nombre) {
        Swal.fire({
            icon: "success",
            text: "Se registro correctamente!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok!",
            backdrop: false
        }).then((result) => {
            if (result.isConfirmed) {
                function redireccionar(ruta) {
                    window.location.href = ruta;
                }
                redireccionar("/ventas");
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Llena todos los campos para realizar el registro",
            backdrop: false
        });
    }

}


function GuardadoUpdate(id) {
        Swal.fire({
            icon: "success",
            text: "Se registro correctamente!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok!",
            backdrop: false
        }).then((result) => {
            if (result.isConfirmed) {
                function redireccionar(ruta) {
                    window.location.href = ruta;
                }
                redireccionar("/ventas");
            }
        });}
