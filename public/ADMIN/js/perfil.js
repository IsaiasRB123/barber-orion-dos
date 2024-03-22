document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save');
  const deleteButton = document.getElementById('delete');
  const profileForm = document.getElementById('profile-form');

  saveButton.addEventListener('click', () => {
    Swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Estás seguro de que deseas guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para guardar los datos (no implementada en este ejemplo)
        Swal.fire('¡Guardado!', 'Los cambios se han guardado correctamente.', 'success');
      }
    });
  });

  deleteButton.addEventListener('click', () => {
    Swal.fire({
      title: '¿Restaurar formulario?',
      text: 'Esta acción restaurará los campos del formulario. ¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Restaurar formulario
        profileForm.reset();
        Swal.fire('¡Restaurado!', 'Los campos del formulario han sido restaurados.', 'success');
      }
    });
  });
});
