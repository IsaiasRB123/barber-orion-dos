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

function Download() {
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

            // Crear una tabla HTML con la misma información que la tabla actual
            var table = document.querySelector('.table');
            var html = table.outerHTML;

            // Agregar estilos adicionales para el formato de Excel si es necesario
            var style = '<style>';
            style += 'table {width: 100%;border-collapse: collapse;}';
            style += 'th, td {border: 1px solid #dddddd;text-align: left;padding: 8px;}';
            style += 'tr:nth-child(even) {background-color: #f2f2f2;}';
            style += '</style>';

            // Crear un objeto Blob para el contenido de la tabla
            var blob = new Blob([style + html], {
                type: 'application/vnd.ms-excel'
            });

            // Crear un objeto URL para el Blob
            var url = URL.createObjectURL(blob);

            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            var a = document.createElement('a');
            a.href = url;
            a.download = 'VentasInforme.xlsx';
            document.body.appendChild(a);
            a.click();

            // Liberar el objeto URL
            setTimeout(function () {
                window.URL.revokeObjectURL(url);
            }, 0);

            // Llamar otra alerta después de que la primera se cierre
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

function Anular(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Anular',
        backdrop: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí iría tu lógica para eliminar el empleado con el ID proporcionado
            Swal.fire({
                title: '¡Anulado!',
                text: 'Se ha anulado correctamente!',
                icon: 'success',
                backdrop: false
            });
        }
    })
}