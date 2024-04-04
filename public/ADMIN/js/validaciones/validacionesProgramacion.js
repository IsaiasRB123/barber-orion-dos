$(document).ready(function () {
    // Validaciones en tiempo real al escribir
    $('#hora_inicio').on('input', function () {
        var horaInicio = $(this).val();
        if (horaInicio === '') {
            $('#alertaHoraInicio').text('Por favor, ingrese la hora de inicio.');
            $('#alertaHoraInicio').addClass('alerta-roja');
        } else {
            $('#alertaHoraInicio').text('');
            $('#alertaHoraInicio').removeClass('alerta-roja');
        }
    });

    $('#hora_fin').on('input', function () {
        var horaFin = $(this).val();
        if (horaFin === '') {
            $('#alertaHoraFin').text('Por favor, ingrese la hora de fin.');
            $('#alertaHoraFin').addClass('alerta-roja');
        } else {
            $('#alertaHoraFin').text('');
            $('#alertaHoraFin').removeClass('alerta-roja');
        }
    });

    // Validaciones al enviar el formulario
    $('#formulario').submit(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del botón de enviar

        // Obtener valores de los campos
        var horaInicio = $('#hora_inicio').val();
        var horaFin = $('#hora_fin').val();
        var mes = $('#mes').val();
        var estado = $('#estado').val();

        // Validar campos
        var validacionCorrecta = true;

        if (horaInicio === '') {
            $('#alertaHoraInicio').text('Por favor, ingrese la hora de inicio.');
            $('#alertaHoraInicio').addClass('alerta-roja');
            validacionCorrecta = false;
        } else {
            $('#alertaHoraInicio').text('');
            $('#alertaHoraInicio').removeClass('alerta-roja');
        }

        if (horaFin === '') {
            $('#alertaHoraFin').text('Por favor, ingrese la hora de fin.');
            $('#alertaHoraFin').addClass('alerta-roja');
            validacionCorrecta = false;
        } else {
            $('#alertaHoraFin').text('');
            $('#alertaHoraFin').removeClass('alerta-roja');
        }

        // Si todas las validaciones son correctas, mostrar mensaje de éxito
        if (validacionCorrecta) {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'La programación ha sido registrada correctamente.',
                allowOutsideClick: true // Permite hacer clic fuera de la alerta para cerrarla
            });
        }
    });
});
