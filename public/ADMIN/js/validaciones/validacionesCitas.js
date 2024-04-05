const formulario = document.getElementById('formularioCitas');
const inputs = document.querySelectorAll('#formularioCitas input');

const expresiones = {
	cliente: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	empleado: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	referencia: /^\d{4,8}$/ // 7 a 14 numeros.
}

const campos = {
	cliente: false,
	empleado: false,
	referencia: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "cliente":
			validarCampo(expresiones.cliente, e.target, 'cliente');
		break;
		case "empleado":
			validarCampo(expresiones.empleado, e.target, 'empleado');
		break;
		case "referencia":
			validarCampo(expresiones.referencia, e.target, 'referencia');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}



inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	
	if(campos.cliente && campos.empleado && campos.formulario){
		formulario.reset();
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Empleado registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
        },5000)
    }
});