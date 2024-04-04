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
        Swal.fire({
          icon: "error",
          text: "Por favor selecciona un producto",
          backdrop: false
        });
        return;
    }

    // Validar que se haya ingresado una cantidad
    if (cantidad === "" || isNaN(cantidad) || parseFloat(cantidad) <= 0) {
        Swal.fire({
            icon: "error",
            text: "Por favor ingresa una cantidad valida",
            backdrop: false
          });
          return;
    }

    // Aquí puedes hacer lo que quieras con los valores, por ejemplo, mostrarlos en la consola
    console.log("Producto: " + producto);
    console.log("Cantidad: " + cantidad);
    console.log("Precio: " + precio);

    // Mostrar alerta de éxito
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
      });
      
}




