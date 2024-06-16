const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de correo.
    telefono: /^\d{7,14}$/, // 7 a 14 números.
    rol: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    rol: false,
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
    const estado = true;

    if (campos.nombre && campos.correo && campos.telefono && campos.rol) {
        const data = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            rol: rol,
            estado: estado
        };

        try {
            const response = await fetch('http://isaiasrb-001-site1.ctempurl.com/api/empleado', {
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
            }).then(() => {
                // Redireccionar a la lista de servicios
                window.location.href = '/Empleados';
            });;

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

document.addEventListener('DOMContentLoaded', function() {
    // URL de la API
    const apiUrl = 'http://isaiasrb-001-site1.ctempurl.com/api/empleado';
    let idEmpleado;

    // Función para cargar los datos del empleado a editar
    function cargarEmpleado(id) {
        axios.get(`${apiUrl}/${id}`)
            .then(response => {
                const empleado = response.data;
                idEmpleado = empleado.id;
                document.getElementById('nombre').value = empleado.nombre;
                document.getElementById('correo').value = empleado.correo;
                document.getElementById('telefono').value = empleado.telefono;
                document.getElementById('rol').value = empleado.rol;
                document.getElementById('estado').value = empleado.estado ? 'true' : 'false';
            })
            .catch(error => {
                console.error('Error al cargar el empleado:', error);
            });
    }

    // Obtener el ID del empleado de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        cargarEmpleado(id);
    }

    // Agregar evento click al botón de editar
    document.getElementById('btn-editar').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el envío automático del formulario

        // Obtener los valores editados del formulario
        const empleadoActualizado = {
            id: idEmpleado,
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            rol: document.getElementById('rol').value,
            estado: document.getElementById('estado').value === 'true'
        };

        // Enviar los datos actualizados al servidor
        axios.put(`${apiUrl}/${idEmpleado}`, empleadoActualizado)
            .then(response => {
                Swal.fire({
                    title: 'Empleado actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    backdrop:false
                }).then(() => {
                    // Redireccionar a la lista de empleados
                    window.location.href = '/Empleados';
                });
            })
            .catch(error => {
                console.error('Error al actualizar el empleado:', error);
                Swal.fire({
                    title: 'Error al actualizar el empleado',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    backdrop:false
                });
            });
    });
});