
// or via CommonJS

// modal eliminar
document.getElementById('alert-eliminar').addEventListener('click', function() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Se elimino con exito",
        showConfirmButton: false,
        timer: 1500
        }).then(function() {
    window.location.href = 'usuarioDashboard.html'; // Cambia "otra_pagina.html" por la URL de tu página destino
  });
});

// fin

document.getElementById('form-registrar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío automático del formulario
    
    // Obtener los valores de los campos
    var name = document.getElementById('nombre-registro').value;
    var email = document.getElementById('correo-registro').value;
    var tel = document.getElementById('telefono-registro').value;
    
    // Realizar validaciones
    
    // Validar nombre (no debe contener números)
    var nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, ingrese un nombre válido (sin números).',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    // Validar email (debe contener un "@" y un ".com")
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    // Validar contraseña (debe tener al menos 8 caracteres)
    if (tel.length !== 10) {
      Swal.fire({
        title: '¡Error!',
        text: 'El telefono debe tener 10 caracteres.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    
    // Si todas las validaciones pasan, puedes enviar el formulario aquí
    // Por ejemplo, podrías hacer una solicitud AJAX o redirigir a otra página
    
    // Aquí simplemente mostraremos una alerta de éxito
    Swal.fire({
          position: "center",
          icon: "success",
          title: "Se registro con exito",
          showConfirmButton: false,
          timer: 1500
    }).then(function() {
      window.location.href = 'usuarioDashboard.html'; });
  });