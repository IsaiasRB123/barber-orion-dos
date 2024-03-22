function validarFormulario() {
    // Obtener referencias a los campos de contraseña
    var newPassword = document.getElementById('newPassword');
    var confirmPassword = document.getElementById('confirmPassword');

    // Verificar que las contraseñas no estén vacías
    if (newPassword.value.trim() === '' || confirmPassword.value.trim() === '') {
        alert('Por favor ingrese una contraseña válida en ambos campos.');
        return false; // Evitar que se envíe el formulario
    }

    // Verificar que las contraseñas coincidan
    if (newPassword.value !== confirmPassword.value) {
        alert('Las contraseñas no coinciden. Por favor inténtelo de nuevo.');
        return false; // Evitar que se envíe el formulario
    }

    // Si todo está bien, se puede enviar el formulario
    return true;
}