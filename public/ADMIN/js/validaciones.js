const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    num: /^[1-9]\d*$/,
}

const campos = {
    nombre: false,
    correo: false,
    telefono:false,
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

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const estado = true;

    const data = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        estado:estado
    };

    try {
        const response = await fetch('http://localhost:5235/api/Cliente', {
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
            title: "Cliente registrado correctamente",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false
        }).then(() => {
            // Redireccionar a la lista de servicios
            window.location.href = '/Clientes';
        });

        formulario.reset();

    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
})

document.addEventListener('DOMContentLoaded', async function () {
    // URL de la API
    const apiUrl = 'http://localhost:5235/api/Cliente';

    // Función para mostrar los detalles del servicio
    async function mostrarDetalleCliente(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);

            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const cliente = await response.json();

            // Asignar el ID del servicio a una variable global para usarlo más tarde
            idDelCliente = cliente.idCliente;

            // Rellenar los campos con los datos del servicio
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('correo').value = cliente.correo;
            document.getElementById('telefono').value = cliente.telefono;
            document.getElementById('estado').value = cliente.estado ? "true" : "false";

        } catch (error) {
            console.error('Error al obtener los detalles del servicio:', error);
        }
    }

    // Obtener el ID del servicio de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idCliente = urlParams.get('id');

    // Llamada a la función para mostrar los detalles del servicio con el ID específico
    await mostrarDetalleCliente(idCliente);

    document.getElementById('btn-editar').addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el envío automático del formulario
    
        // Obtener los valores editados del formulario
        const ClienteActualizado = {
            idCliente: idDelCliente,
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            estado: document.getElementById('estado').value === "true" ? true : false
        };
    
        // Enviar los datos actualizados al servidor utilizando fetch en lugar de axios
        fetch(`${apiUrl}/${idCliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ClienteActualizado)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.success) {
                Swal.fire({
                    title: 'Error al actualizar el Cliente',
                    text: data.message || 'Hubo un problema al intentar actualizar el cliente. Por favor, intenta de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    backdrop: false
                });
            } else {
                // Manejar el caso en que el servidor devuelva un error
                Swal.fire({
                    title: 'Cliente actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    backdrop: false
                }).then(() => {
                    // Redireccionar a la lista de servicios
                    window.location.href = '/Clientes';
                });
            }
        })
        .catch(error => {
            // Manejar el error en caso de fallo en la solicitud HTTP
            console.error('Error al actualizar el Cliente:', error);
            Swal.fire({
                title: 'Error al actualizar el cliente',
                text: 'Hubo un problema al intentar actualizar el cliente. Por favor, intenta de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'OK',
                backdrop: false
            });
        });
    });    
})
