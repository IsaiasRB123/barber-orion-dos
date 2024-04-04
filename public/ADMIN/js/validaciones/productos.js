function actualizarPrecio() {
    var select = document.getElementById("productos");
    var precioInput = document.getElementById("precio");

    // Obtener el valor seleccionado del select
    var selectedOption = select.options[select.selectedIndex];
    var producto = selectedOption.value;

    // Asignar el precio correspondiente
    var precio;
    switch (producto) {
        case "cera_antioxidante":
            precio = 20000;
            break;
        case "minoxidil":
            precio = 50000;
            break;
        case "shampoo_180ml":
            precio = 37000;
            break;
        default:
            precio = "";
    }

    // Actualizar el campo de precio con el precio correspondiente
    precioInput.value = precio;
}

function mostrarAlertaAgg() {
    var producto = document.getElementById("productos").value;
    var cantidad = document.getElementById("cantidad").value;
    var precio = document.getElementById("precio").value;

    // Validar que se haya seleccionado un producto
    if (producto === "Productos") {
        swal("Error", "Por favor selecciona un producto.", "error");
        return;
    }

    // Validar que se haya ingresado una cantidad
    if (cantidad === "" || isNaN(cantidad) || parseFloat(cantidad) <= 0) {
        swal("Error", "Por favor ingresa una cantidad válida.", "error");
        return;
    }

    // Aquí puedes hacer lo que quieras con los valores, por ejemplo, mostrarlos en la consola
    console.log("Producto: " + producto);
    console.log("Cantidad: " + cantidad);
    console.log("Precio: " + precio);

    // Mostrar alerta de éxito
    swal("Producto agregado correctamente.", {
        icon: "success",
        timer: 1500
    });
}



