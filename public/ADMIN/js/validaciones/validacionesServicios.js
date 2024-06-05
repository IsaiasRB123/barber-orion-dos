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

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const tiempo = document.getElementById('tiempo').value;
    const estado = true;

    const data = {
        nombre: nombre,
        precio: precio,
        tiempo: tiempo,
        estado:estado
    };

    try {
        const response = await fetch('http://localhost:5235/api/Servicio', {
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
            title: "Servicio registrado correctamente",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false
        }).then(() => {
            // Redireccionar a la lista de servicios
            window.location.href = '/ServiciosA';
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
});

document.addEventListener('DOMContentLoaded', async function () {
    // URL de la API
    const apiUrl = 'http://localhost:5235/api/Servicio';

    // Función para mostrar los detalles del servicio
    async function mostrarDetalleServicio(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);

            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const servicio = await response.json();

            // Asignar el ID del servicio a una variable global para usarlo más tarde
            idDelServicio = servicio.idServicio;

            // Rellenar los campos con los datos del servicio
            document.getElementById('nombre').value = servicio.nombre;
            document.getElementById('precio').value = servicio.precio;
            document.getElementById('tiempo').value = servicio.tiempo;
            document.getElementById('estado').value = servicio.estado ? "true" : "false";

        } catch (error) {
            console.error('Error al obtener los detalles del servicio:', error);
        }
    }

    // Obtener el ID del servicio de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idServicio = urlParams.get('id');

    // Llamada a la función para mostrar los detalles del servicio con el ID específico
    await mostrarDetalleServicio(idServicio);

    // Escuchar el evento click del botón "Actualizar"
    document.getElementById('btn-editar').addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el envío automático del formulario

        // Obtener los valores editados del formulario
        const servicioActualizado = {
            idServicio: idDelServicio,
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            tiempo: document.getElementById('tiempo').value,
            estado: document.getElementById('estado').value === "true" ? true : false
        };

        // Enviar los datos actualizados al servidor utilizando axios
        axios.put(`${apiUrl}/${idServicio}`, servicioActualizado)
        console.log(servicioActualizado)
            .then(response => {
                // Manejar la respuesta del servidor
                if (response.data.success) {
                    Swal.fire({
                        title: 'Error al actualizar el Servicio',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        backdrop: false
                    });
                } else {
                    // Manejar el caso en que el servidor devuelva un error
                    Swal.fire({
                        title: 'Servicio actualizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        backdrop: false
                    }).then(() => {
                        // Redireccionar a la lista de servicios
                        window.location.href = '/ServiciosA';
                    });
                }
            })
            .catch(error => {
                // Manejar el error en caso de fallo en la solicitud HTTP
                console.error('Error al actualizar el Servicio:', error);
                Swal.fire({
                    title: 'Error al actualizar el Servicio',
                    text: 'Hubo un problema al intentar actualizar el Servicio. Por favor, intenta de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    backdrop: false
                });
            });
    });
});