 // Función para validar al menos un checkbox seleccionado
 function validarCheckbox() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var mensajeError = document.getElementById('mensaje-error');
    
    if (checkboxes.length === 0) {
        mensajeError.textContent = 'Por favor selecciona al menos un servicio.';
        return false;
    } else {
        mensajeError.textContent = '';
        return true;
    }
}

// Escuchador de eventos para validar los checkbox cuando se pierde el foco
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', validarCheckbox);
});

// Función para enviar el formulario
function enviarFormulario() {
    var esCheckboxValido = validarCheckbox();
    
    if (esCheckboxValido) {
        // Aquí puedes enviar el formulario o realizar otras acciones
        alert('Formulario válido. ¡Enviando!');
    } else {
        alert('Por favor, selecciona al menos un servicio antes de enviar.');
    }
}

// Escuchador de eventos para enviar el formulario cuando se hace clic en el botón
document.getElementById('btnEnviar').addEventListener('click', enviarFormulario);
