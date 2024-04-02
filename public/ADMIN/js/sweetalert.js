const Eliminar = () => {
    Swal.fire({
        title: "Esta seguro?",
        text: "Se eliminara este cliente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "Eliminado correctamente",
            icon: "success"
          });
        }
      });
}
