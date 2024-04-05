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
                text: 'Se ha eliminado correctamente!',
                icon: 'success',
                backdrop: false
            });
        }
    })
}

function Download(id) {
    let timerInterval;
    Swal.fire({
        title: "Descargando!",
        html: "Tiempo: <b></b> milisegundos.",
        timer: 2000,
        timerProgressBar: true,
        backdrop:false,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            // Aquí se llama otra alerta después de que la primera se cierre
            Swal.fire({
                icon: "success",
                title: "Se ha guardado correctamente!",
                showConfirmButton: false,
                timer: 1500,
                backdrop:false
              });
              
        }
    });
}

