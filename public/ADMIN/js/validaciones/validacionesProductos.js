document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        precio: /^(?:[1-9]|[1-9]\d+)(?:\.\d{1,2})?$/,
        num: /^[1-9]\d*$/,
    };

    const campos = {
        nombre: false,
        stock: false,
        precio: false,
        'Stock-Consumo': false,
        'Stock-Venta': false,
    };

    const ValidarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                ValidarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "stock":
                ValidarCampo(expresiones.num, e.target, 'stock');
                break;
            case "precio":
                ValidarCampo(expresiones.precio, e.target, 'precio');
                break;
            case "Stock-Consumo":
                ValidarCampo(expresiones.num, e.target, 'Stock-Consumo');
                break;
            case "Stock-Venta":
                ValidarCampo(expresiones.num, e.target, 'Stock-Venta');
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

    inputs.forEach((input) => {
        input.addEventListener('keyup', ValidarFormulario);
        input.addEventListener('blur', ValidarFormulario);
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (campos.nombre && campos.stock && campos.precio &&  campos['Stock-Consumo'] &&  campos['Stock-Venta']) {
            formulario.reset();
            Swal.fire({
                icon: "success",
                title: "Producto registrado correctamente",
                showConfirmButton: false,
                timer: 1500,
                backdrop:false
            });
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            }, 5000);
        }
    });
});