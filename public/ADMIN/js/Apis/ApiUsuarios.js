function eliminarServicio(idServicio) {
    // Alerta de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este servicio.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
        backdrop: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, se realiza la solicitud DELETE a la API
            axios.delete(`http://localhost:5276/api/UsuarioDos/${idServicio}`)
                .then(response => {
                    // Si la eliminación es exitosa, se muestra una alerta de éxito
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                      });
                    console.log('Usuario eliminado exitosamente:', response.data);
                    setTimeout(()=> {location.reload();},1000
                    )
                    // Se recarga la página para mostrar los cambios actualizados

                })
                .catch(error => {
                    // Si ocurre un error al eliminar el servicio, se muestra una alerta de error
                    Swal.fire(
                        'Error',
                        'Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.',
                        'error'
                    );
                    console.error('Error al eliminar el usuario:', error);
                });
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // URL de la API
    const apiUrl = 'http://localhost:5276/api/UsuarioDos';

    // Función para renderizar los servicios en el tbody
    function renderServicios(servicios) {
        const tbody = document.getElementById('servicios-tbody');
        tbody.innerHTML = ''; // Limpiar el contenido anterior

        servicios.forEach(servicio => {
            const tr = document.createElement('tr');
            const estado = servicio.estado ? 'Activo' : 'Inactivo';
            tr.innerHTML = `
                <td>${servicio.nombre}</td>
                <td>${servicio.correo}</td>
                <td>${servicio.telefono}</td>
                <td>${servicio.roleDosId}</td>
                <td>${estado}</td>
                <td>
                    <a class="Btn-shadow" href="/UsuariosVer?id=${servicio.id}" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" class="svgIcon" width="11.25" viewBox="0 0 576 512">
                            <path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                        </svg>
                    </a>
                    <a class="Btn-delete8" onclick="eliminarServicio(${servicio.id})" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" height="10" width="8.75" viewBox="0 0 448 512">
                            <path fill="#1e3050" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </a>
                    <a class="Btn-update" href="UsuariosModificar?id=${servicio.id}" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                        </svg>
                    </a>
                </td>
            `;

            tbody.appendChild(tr);
        });
    }

    // Llamada a la API usando Axios
    axios.get(apiUrl)
        .then(response => {
            const servicios = response.data;
            renderServicios(servicios);
        })
        .catch(error => {
            console.error('Error al obtener los servicios:', error);
        });
});

// Función para redireccionar al detalle del servicio con el ID específico
function verDetalle(idServicio) {
    window.location.href = `/UsuariosVer?id=${idServicio}`;
}

function ModificarServicio(idServicio) {
    window.location.href = `/UsuariosModificar?id=${idUsuario}`;
}

///Registrar
const formulario = document.getElementById('formulario');
        const campos = {
            nombre: false,
            correo: false,
            telefono: false,
            rol: false,
            estado: false
        };

        formulario.addEventListener('input', (e) => {
            validarCampo(e.target);
        });

        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const telefono = document.getElementById('telefono').value;
            const rol = document.getElementById('roleId').value;
            const estado = true;

            
                const data = {
                    nombre: nombre,
                    correo: correo,
                    telefono: telefono,
                    roleId: rol,
                    estado: estado
                };

                try {
                    const response = await fetch('http://localhost:5276/api/UsuarioDos', {
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
                    })
                
                    

                    formulario.reset();
                    resetCampos();

                } catch (error) {
                    console.error('Error al enviar la solicitud:', error);
                    mostrarMensajeError();
                }
            }
        );

        function validarCampo(campo) {
            const valor = campo.value;
            switch (campo.id) {
                case 'nombre':
                    campos.nombre = valor.length > 0;
                    break;
                case 'correo':
                    campos.correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valor);
                    break;
                case 'telefono':
                    campos.telefono = /^[0-9]{10}$/.test(valor);
                    break;
                case 'rol':
                    campos.rol = valor.length > 0;
                    break;
                case 'estado':
                    campos.estado = valor === 'Activo' || valor === 'Inactivo';
                    break;
            }
        }

        function resetCampos() {
            campos.nombre = false;
            campos.correo = false;
            campos.telefono = false;
            campos.rol = false;
            campos.estado = false;
        }

        function mostrarMensajeError() {
            document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
            }, 5000);
        }

