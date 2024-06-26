const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	
}

const campos = {
	password: false,
	correo: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
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

	
	if(campos.password && campos.correo){
		formulario.reset();
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Cliente registrado correctamente",
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