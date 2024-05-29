document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        empleado: /^[0-9]+$/, // IDs numéricos para empleados
        mes: /^(0[1-9]|1[0-2])$/, // Mes en formato MM (01 a 12)
        hora: /^([01]\d|2[0-3]):?([0-5]\d)$/, // Formato de hora HH:mm
        estado: /^(Activo|Inactivo)$/ // Solo puede ser Activo o Inactivo
    };

    const campos = {
        empleado: false,
        mes: false,
        horaInicio: false,
        horaFin: false,
        estado: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "empleado":
                validarCampo(expresiones.empleado, e.target, 'empleado');
                break;
            case "mes":
                validarCampo(expresiones.mes, e.target, 'mes');
                break;
            case "horaInicio":
                validarCampo(expresiones.hora, e.target, 'horaInicio');
                break;
            case "horaFin":
                validarCampo(expresiones.hora, e.target, 'horaFin');
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

        const empleado = document.getElementById('empleado').value;
        const mes = document.getElementById('mes').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFin = document.getElementById('horaFin').value;
        const estado = document.getElementById('estado').value;

        if (campos.empleado && campos.mes && campos.horaInicio && campos.horaFin && campos.estado) {
            const data = {
                empleadoId: empleado,
                mes: mes,
                horaInicio: horaInicio,
                horaFin: horaFin,
                estado: estado === 'Activo'
            };

            try {
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

                Swal.fire({
                    icon: "success",
                    title: "Programación registrada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });

                formulario.reset();

                // Restablecer los campos a false
                campos.empleado = false;
                campos.mes = false;
                campos.horaInicio = false;
                campos.horaFin = false;
                campos.estado = false;

            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                // Mostrar mensaje de error
                document.getElementById('formulario_mensaje').classList.add('formulario__mensaje-activo');
                setTimeout(() => {
                    document.getElementById('formulario_mensaje').classList.remove('formulario__mensaje-activo');
                }, 5000);
            }
        } else {
            document.getElementById('formulario_mensaje').classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario_mensaje').classList.remove('formulario__mensaje-activo');
            }, 5000);
        }
    });

    // Obtener empleados
    fetch('http://localhost:5211/api/empleado')
        .then(response => response.json())
        .then(data => {
            const empleadoSelect = document.getElementById('empleado');
            data.forEach(empleado => {
                const option = document.createElement('option');
                option.value = empleado.id;
                option.textContent = empleado.nombre;
                empleadoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los empleados:', error));
});
