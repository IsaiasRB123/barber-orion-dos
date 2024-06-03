document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');

    const expresiones = {
        mes: /^(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)$/i, // Meses por nombre
        hora: /^([01]\d|2[0-3]):?([0-5]\d)$/, // Formato de hora HH:mm
        estado: /^(Activo|Inactivo)$/i // Solo puede ser Activo o Inactivo
    };

    const campos = {
        empleado: true, // Empleado siempre está validado
        mes: false,
        horaInicio: false,
        horaFin: false,
        estado: false
    };

    const validarFormulario = (e) => {
        switch (e.target.name) {
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
    };

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
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const empleado = document.getElementById('empleado').value;
        const mes = document.getElementById('mes').value.toLowerCase(); // convertir el mes a minúsculas
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFin = document.getElementById('horaFin').value;
        const estado = document.getElementById('estado').value.toLowerCase() === 'activo';

        console.log('Valores del formulario:', { empleado, mes, horaInicio, horaFin, estado });

        if (campos.empleado && campos.mes && campos.horaInicio && campos.horaFin && campos.estado) {
            const data = {
                empleadoId: parseInt(empleado),
                mes: mes,
                horaInicio: new Date().toISOString().slice(0,10) + "T" + horaInicio + ":00",
                horaFin: new Date().toISOString().slice(0,10) + "T" + horaFin + ":00",
                estado: estado
            };

            console.log('Enviando datos:', data); // Log para depuración

            try {
                const response = await fetch('http://localhost:5211/api/programEmpleado', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log('Respuesta del servidor:', response); // Log para depuración

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Error en la solicitud: ${errorMessage}`);
                }

                const result = await response.json();
                console.log('Respuesta JSON del servidor:', result); // Log para depuración

                Swal.fire({
                    icon: "success",
                    title: "Programación registrada correctamente",
                    showConfirmButton: false,
                    timer: 1500,
                    backdrop: false
                });

                formulario.reset();

                // Restablecer los campos a false, excepto empleado
                campos.mes = false;
                campos.horaInicio = false;
                campos.horaFin = false;
                campos.estado = false;

                // Restablecer las clases de validación
                document.querySelectorAll('.input-box-correcto').forEach(el => {
                    el.classList.remove('input-box-correcto');
                });
                document.querySelectorAll('.formulario__input-error-activo').forEach(el => {
                    el.classList.remove('formulario__input-error-activo');
                });

                // Actualizar la tabla con los nuevos datos
                listarProgramaciones();

            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                document.getElementById('formulario_mensaje').classList.add('formulario__mensaje-activo');
                setTimeout(() => {
                    document.getElementById('formulario_mensaje').classList.remove('formulario__mensaje-activo');
                }, 5000);
            }
        } else {
            console.log('Campos con error:', campos); // Log para depuración
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

    // Función para listar las programaciones en una tabla
    const listarProgramaciones = () => {
        fetch('http://localhost:5211/api/programEmpleado')
            .then(response => response.json())
            .then(data => {
                // Aquí agregar el código para actualizar la tabla con los datos recibidos
                console.log('Programaciones:', data); // Log para depuración
            })
            .catch(error => console.error('Error al obtener las programaciones:', error));
    }
});
