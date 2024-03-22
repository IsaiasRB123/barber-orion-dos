document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente
        
        
        // Muestra la alerta de éxito con SweetAlert
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El Codigo se envió a su correo correctamente',
        });

        // esto es para redirigir al usuario a otra página después de mostrar la alerta
        // window.location.href = "pagina-exito.html";
    });
});