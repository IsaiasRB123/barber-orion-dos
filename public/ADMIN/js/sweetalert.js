function Eliminar(id) {
  Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      backdrop: false 
  }).then((result) => {
      if (result.isConfirmed) {
          // Aquí iría tu lógica para eliminar el empleado con el ID proporcionado
          Swal.fire({
              title: '¡Eliminado!',
              text: 'El empleado ha sido eliminado.',
              icon: 'success',
              backdrop: false
          });
      }
  })
}