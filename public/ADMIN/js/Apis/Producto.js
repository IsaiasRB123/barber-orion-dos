// Función para eliminar un producto
function eliminarProducto(id) {
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
            axios.delete(`http://localhost:5062/api/producto/${id}`)
                .then(response => {
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El producto ha sido eliminado.',
                        backdrop: false,
                        icon: 'success'
                    });
                    obtenerProductos(); // Actualizar la lista de productos
                })
                .catch(error => {
                    console.error('Error al eliminar producto:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al intentar eliminar el producto.',
                        icon: 'error'
                    });
                });
        }
    });
}

// Función para renderizar los productos
function renderProductos(productos) {
    const tbody = document.getElementById('productostabla');
    tbody.innerHTML = ''; // Limpiar el contenido anterior

    productos.forEach(producto => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td><img src="${producto.imagen}" alt="Imagen del producto" style="width: 50px; height: 50px;"></td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.iva}</td>
        <td>
          <a class="Btn-shadow" href="/ProductosV?id=${producto.id}" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" class="svgIcon" width="11.25" viewBox="0 0 576 512">
              <!-- Icono de sombra -->
            </svg>
          </a>
          <a class="Btn-delete8" onclick="eliminarProducto(${producto.id})" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
            <svg xmlns="http://www.w3.org/2000/svg" class="svgIcon" height="10" width="8.75" viewBox="0 0 448 512">
              <!-- Icono de eliminar -->
            </svg>
          </a>
          <a class="Btn-update" href="/ProductosUpdate?id=${producto.id}" style="margin-left: 15px; margin-bottom: 15px; float: inline-start;">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 512 512">
              <!-- Icono de actualizar -->
            </svg>
          </a>
        </td>
      `;

        tbody.appendChild(tr);
    });
}

// Función para obtener los productos desde el servidor
function obtenerProductos() {
    const apiUrl = 'http://localhost:5062/api/producto';

    axios.get(apiUrl)
        .then(response => {
            const productos = response.data;
            renderProductos(productos);
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Cargar los productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', obtenerProductos);

function cargarProducto(id) {
    axios.get(`http://localhost:5062/api/producto/${id}`)
        .then(response => {
            const producto = response.data;

            document.getElementById('id').value = producto.id; // Campo oculto para el ID
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('imagen').value = producto.imagen;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('cantidad').value = producto.cantidad;
            document.getElementById('iva').value = producto.iva;
        })
        .catch(error => {
            console.error('Error al cargar el producto:', error);
        });
}
