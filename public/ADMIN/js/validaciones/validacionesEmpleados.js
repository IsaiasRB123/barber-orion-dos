const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de correo.
    telefono: /^\d{7,14}$/, // 7 a 14 números.
    rol: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    estado: /^(Activo|Inactivo)$/ // Solo puede ser Activo o Inactivo.
};

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    rol: false,
    estado: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "rol":
            validarCampo(expresiones.rol, e.target, 'rol');
            break;
        case "estado":
            validarCampo(expresiones.estado, e.target, 'estado');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
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
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value;
    const estado = document.getElementById('estado').value === 'Activo'; // Convertir a booleano

    if (campos.nombre && campos.correo && campos.telefono && campos.rol && campos.estado) {
        const data = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            rol: rol,
            estado: estado
        };

        try {
            const response = await fetch('http://localhost:5211/api/empleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            Swal.fire({
                icon: "success",
                title: "Empleado registrado correctamente",
                showConfirmButton: false,
                timer: 1500,
                backdrop: false
            });

            formulario.reset();

            // Restablecer los campos a false
            campos.nombre = false;
            campos.correo = false;
            campos.telefono = false;
            campos.rol = false;
            campos.estado = false;

        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
            }, 5000);
        }
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
        }, 5000);
    }
});