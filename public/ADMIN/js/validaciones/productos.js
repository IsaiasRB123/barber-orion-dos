let ListaProductos = [
    "Minoxidil",
    "Camisa Adidas",
    "Cera"
];

const select = document.getElementById("productos");
let ListaProductosVentas = [];

ListaProductos.forEach((producto, index) => {
    var option = document.createElement('option');
    option.value = index;
    option.textContent = producto;
    select.appendChild(option);
});

const precioInput = document.getElementById("precio");
const cantidadInput = document.getElementById("cantidad");

function actualizarPrecio() {
    var selectedOption = select.options[select.selectedIndex];
    var producto = selectedOption.value;

    var precio;
    switch (producto) {
        case "0":
            precio = 20000;
            break;
        case "1":
            precio = 50000;
            break;
        case "2":
            precio = 37000;
            break;
        default:
            precio = "";
    }

    precioInput.value = precio;
}

function renderProductoVentas() {
    const tbody = document.getElementById('ProductosVentas');

    var selectedOption = select.options[select.selectedIndex];
    var producto = selectedOption.textContent;

    if (producto === "Seleccione un producto") {
        Swal.fire({
            icon: "error",
            text: "Por favor selecciona un producto",
            backdrop: false
        });
        return;
    }

    var cantidad = parseFloat(cantidadInput.value);
    if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire({
            icon: "error",
            text: "Por favor ingresa una cantidad válida",
            backdrop: false
        });
        return;
    }

    var precio = parseFloat(precioInput.value);
    var productoExistente = ListaProductosVentas.find(item => item.producto === producto);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
        productoExistente.subtotal_iva = productoExistente.subtotal * 0.16;
        productoExistente.montoTotal = productoExistente.subtotal + productoExistente.subtotal_iva;
    } else {
        ListaProductosVentas.push({
            producto: producto,
            cantidad: cantidad,
            precio: precio,
            subtotal: precio * cantidad,
            subtotal_iva: precio * cantidad * 0.16,
            montoTotal: precio * cantidad * 1.16
        });
    }

    tbody.innerHTML = '';  // Limpiar el contenido anterior
    ListaProductosVentas.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.subtotal}</td>
            <td>16%</td>
            <td>${item.subtotal_iva}</td>
            <td>${item.montoTotal}</td>
            <td>
                <a class="Btn-delete8" data-toggle="modal"
                    style="margin-left: 15px; margin-bottom: 15px; float: inline-start;"
                    onclick="Eliminar(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" height="10" width="8.75" viewBox="0 0 448 512">
                        <path fill="#1e3050"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
    });

    // Limpiar los campos de entrada
    cantidadInput.value = '';
    precioInput.value = '';
    select.value = '';
}

function Eliminar(index) {
    // Eliminar el producto de la lista
    ListaProductosVentas.splice(index, 1);
    
    // Renderizar nuevamente la tabla
    const tbody = document.getElementById('ProductosVentas');
    tbody.innerHTML = '';
    ListaProductosVentas.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.subtotal}</td>
            <td>16%</td>
            <td>${item.subtotal_iva}</td>
            <td>${item.montoTotal}</td>
            <td>
                <a class="Btn-delete8" data-toggle="modal"
                    style="margin-left: 15px; margin-bottom: 15px; float: inline-start;"
                    onclick="Eliminar(${idx})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" height="10" width="8.75" viewBox="0 0 448 512">
                        <path fill="#1e3050"
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    Swal.fire({
        icon: "success",
        title: "Producto eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
        backdrop: false
    });
}