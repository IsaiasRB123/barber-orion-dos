let carrito = [];

// Función para renderizar productos
function renderizarProductos() {
    const contenedorProductos = document.getElementById('productos');

    productos.forEach(producto => {
        const i = Tarjeta(producto)
        contenedorProductos.appendChild(i);
    });
}

function Tarjeta(producto) {
    const elementoProducto = document.createElement('div');
    elementoProducto.className = 'item';
    elementoProducto.innerHTML = `
    <span class="titulo-item">${producto.nombre}</span>
    <img src="${producto.img}" alt="" class="img-item">
    <span class="precio-item">${producto.precio}</span>
    <button class="boton-item">Ir a reservar</button>
                        `;
    return elementoProducto;
}
