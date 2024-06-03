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

function mostrarImagen() {
    const fileInput = document.getElementById('inputGroupFile01');
    const vistaPrevia = document.getElementById('vistaPrevia');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        vistaPrevia.innerHTML = '<img src="' + e.target.result + '" class="img-thumbnail" alt="Vista previa de la imagen" width="100px" heigth="100px">';
    }

    reader.readAsDataURL(file);
}