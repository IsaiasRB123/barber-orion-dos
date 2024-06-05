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
    const grupoCampo = document.getElementById(`grupo__${campo}`);
    const inputError = document.querySelector(`#grupo__${campo} .formulario__input-error`);

    if (!grupoCampo || !inputError) {
        console.error(`El grupo de campo o el error de input para ${campo} no existe.`);
        return;
    }

    if (expresion.test(input.value)) {
        grupoCampo.classList.remove('input-box-incorrecto');
        grupoCampo.classList.add('input-box-correcto');
        inputError.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupoCampo.classList.add('input-box-incorrecto');
        grupoCampo.classList.remove('input-box-correcto');
        inputError.classList.add('formulario__input-error-activo');
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
        const estado = true; // Convertir a booleano
        const rol = document.getElementById('rol').value;

        const data = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            roleDosId: rol,  // Cambiado a roleDosId
            estado: estado,
        };
        console.log(data);

        try {
            const response = await fetch('http://localhost:5276/api/UsuarioDos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error en la solicitud: ${errorDetails}`);
            }

            Swal.fire({
                icon: "success",
                title: "Usuario registrado correctamente",
                showConfirmButton: false,
                timer: 1500,
                backdrop: false
            }).then(()=>{ Window.location.href ='/Usuarios'})

            

            // Restablecer los campos a false
            Object.keys(campos).forEach((campo) => {
                campos[campo] = false;
            });

        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            const formularioMensaje = document.getElementById('formulario_mensaje');
            if (formularioMensaje) {
                formularioMensaje.classList.add('formulario_mensaje-activo');
                setTimeout(() => {
                    formularioMensaje.classList.remove('formulario_mensaje-activo');
                }, 5000);
            }
        }
    });
    document.addEventListener('DOMContentLoaded', async function () {
        const apiUrl = 'http://localhost:5276/api/UsuarioDos';
    
        let idDelServicio;
    
        async function mostrarDetalleServicio(id) {
            try {
                const response = await fetch(`${apiUrl}/${id}`);
                if (!response.ok) throw new Error('Error en la respuesta de la API');
    
                const servicio = await response.json();
                idDelServicio = servicio.id;
    
                console.log(servicio);  // Depuración: Verificar los datos del servicio
    
                document.getElementById('nombre').value = servicio.nombre;
                document.getElementById('correo').value = servicio.correo;
                document.getElementById('telefono').value = servicio.telefono;
                document.getElementById('rol').value = servicio.roleDosId;
                document.getElementById('estado').value = servicio.estado ? "true" : "false";
    
            } catch (error) {
                console.error('Error al obtener los detalles del servicio:', error);
            }
        }
    
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    
        console.log(id);  // Depuración: Verificar el ID obtenido de la URL
    
        await mostrarDetalleServicio(id);
    
        document.getElementById('btn-editar').addEventListener('click', function (event) {
            event.preventDefault();
    
            const servicioActualizado = {
                idDelServicio: id,
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                roleDosId: document.getElementById('rol').value,
                estado: document.getElementById('estado').value === "true"
            };
    
            console.log(servicioActualizado);  // Depuración: Verificar los datos actualizados
    
            axios.put(`${apiUrl}/${idDelServicio}`, servicioActualizado)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Servicio actualizado correctamente',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            backdrop: false
                        }).then(() => {
                            window.location.href = '/ServiciosA';
                        });
                    } else {
                        Swal.fire({
                            title: 'Error al actualizar el Servicio',
                            text: response.data.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                            backdrop: false
                        });
                    }
                })
                .catch(error => {
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
    