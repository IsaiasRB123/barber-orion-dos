const formulario = document.getElementById('formulario');
document.addEventListener('DOMContentLoaded', () => {
    const empleadoSelect = document.getElementById('empleado');
    const horaInicioInput = document.getElementById('horaInicio');
    const horaFinInput = document.getElementById('horaFin');
    const formulario = document.getElementById('formulario');
    const registrosGuardados = [];

    // Obtener empleados
    fetch('http://localhost:5211/api/empleado')
        .then(response => response.json())
        .then(data => {
            data.forEach(empleado => {
                const option = document.createElement('option');
                option.value = empleado.id;
                option.textContent = empleado.nombre;
                empleadoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los empleados:', error));

    // Función para validar campos
    function validarCampo(input, mensajeError) {
        if (input.value.trim() === '') {
            input.parentElement.classList.add('input-box-incorrecto');
            input.nextElementSibling.textContent = mensajeError;
            return false;
        } else {
            input.parentElement.classList.remove('input-box-incorrecto');
            input.nextElementSibling.textContent = '';
            return true;
        }
    }

    // Validaciones en tiempo real
    horaInicioInput.addEventListener('input', () => {
        validarCampo(horaInicioInput, 'Por favor, ingrese la hora de inicio.');
    });

    horaFinInput.addEventListener('input', () => {
        validarCampo(horaFinInput, 'Por favor, ingrese la hora de fin.');
    });

    // Validación del campo select
    empleadoSelect.addEventListener('change', () => {
        validarCampo(empleadoSelect, 'Por favor, seleccione un empleado.');
    });

    // Función para manejar el envío del formulario
    formulario.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validar todos los campos
        const camposValidos = validarCampo(horaInicioInput, 'Por favor, ingrese la hora de inicio.') &&
                              validarCampo(horaFinInput, 'Por favor, ingrese la hora de fin.') &&
                              validarCampo(empleadoSelect, 'Por favor, seleccione un empleado.');

        if (camposValidos) {
            // Construir objeto con los datos del formulario
            const data = {
                empleadoId: empleadoSelect.value,
                mes: document.getElementById('mes').value,
                horaInicio: horaInicioInput.value,
                horaFin: horaFinInput.value,
                estado: document.getElementById('estado').value
            };

            try {
                // Enviar datos al servidor
                const response = await fetch('http://localhost:5211/api/programEmpleado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                // Guardar el registro localmente
                registrosGuardados.push(data);
                localStorage.setItem('registros', JSON.stringify(registrosGuardados));

                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'La programación ha sido registrada correctamente.',
                    allowOutsideClick: true,
                    backdrop: false
                });

                // Resetear formulario
                formulario.reset();
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                // Mostrar mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al registrar la programación. Por favor, inténtelo de nuevo.'
                });
            }
        }
    });
});