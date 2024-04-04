$(document).ready(function () {
    $('#nombre').on('input', function () {
        var nombre = $(this).val();
        if (!/^[a-zA-Z]*$/.test(nombre)) {
            $('#alertaNombre').text('Solo se permiten letras en el nombre.');
            $('#alertaNombre').addClass('alerta-roja');
        } else {
            $('#alertaNombre').text('');
            $('#alertaNombre').removeClass('alerta-roja');
        }
    });

    $('#correo').on('input', function () {
        var correo = $(this).val();
        if (!/^\S+@\S+\.\S+$/.test(correo)) {
            $('#alertaCorreo').text('El formato del correo electrónico no es válido.');
            $('#alertaCorreo').addClass('alerta-roja');
        } else {
            $('#alertaCorreo').text('');
            $('#alertaCorreo').removeClass('alerta-roja');
        }
    });

    $('#telefono').on('input', function () {
        var telefono = $(this).val();
        if (!/^\d{7,10}$/.test(telefono)) {
            $('#alertaTelefono').text('El teléfono debe tener de 7 a 10 dígitos.');
            $('#alertaTelefono').addClass('alerta-roja');
        } else {
            $('#alertaTelefono').text('');
            $('#alertaTelefono').removeClass('alerta-roja');
        }
    });

    $('#rol').change(function () {
        var rol = $(this).val();
        if (rol === '') {
            $('#alertaRol').text('Por favor, seleccione un rol.');
        } else {
            $('#alertaRol').text('');
        }
    });

    $('#estado').change(function () {
        var estado = $(this).val();
        if (estado === '') {
            $('#alertaEstado').text('Por favor, seleccione un estado.');
        } else {
            $('#alertaEstado').text('');
        }
    });

    $('#btn-registrar').click(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del botón de enviar

        // Realizar todas las validaciones nuevamente al hacer clic en el botón de registro
        var nombre = $('#nombre').val();
        var correo = $('#correo').val();
        var telefono = $('#telefono').val();
        var rol = $('#rol').val();
        var estado = $('#estado').val();

        var validacionCorrecta = true;

        if (!/^[a-zA-Z]*$/.test(nombre)) {
            $('#alertaNombre').text('Solo se permiten letras en el nombre.');
            $('#alertaNombre').addClass('alerta-roja');
            validacionCorrecta = false;
        } else {
            $('#alertaNombre').text('');
            $('#alertaNombre').removeClass('alerta-roja');
        }

        if (!/^\S+@\S+\.\S+$/.test(correo)) {
            $('#alertaCorreo').text('El formato del correo electrónico no es válido.');
            $('#alertaCorreo').addClass('alerta-roja');
            validacionCorrecta = false;
        } else {
            $('#alertaCorreo').text('');
            $('#alertaCorreo').removeClass('alerta-roja');
        }

        if (!/^\d{7,10}$/.test(telefono)) {
            $('#alertaTelefono').text('El teléfono debe tener de 7 a 10 dígitos.');
            $('#alertaTelefono').addClass('alerta-roja');
            validacionCorrecta = false;
        } else {
            $('#alertaTelefono').text('');
            $('#alertaTelefono').removeClass('alerta-roja');
        }

        if (rol === '') {
            $('#alertaRol').text('Por favor, seleccione un rol.');
            validacionCorrecta = false;
        } else {
            $('#alertaRol').text('');
        }

        if (estado === '') {
            $('#alertaEstado').text('Por favor, seleccione un estado.');
            validacionCorrecta = false;
        } else {
            $('#alertaEstado').text('');
        }

        // Si todas las validaciones son correctas, mostrar la alerta de confirmación
        if (validacionCorrecta) {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'El empleado ha sido registrado correctamente.',
                backdrop: false,
                allowOutsideClick: true // Permite hacer clic fuera de la alerta para cerrarla
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario confirma, enviar el formulario
                    $('#formulario').submit();
                }
            });
        }
    });
});