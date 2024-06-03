document.addEventListener('DOMContentLoaded', async function () {
    const apiUrlVentas = 'http://localhost:5235/api/Venta';
    const apiUrlClientes = 'http://localhost:5235/api/Cliente';

    // Función para renderizar las ventas en el tbody
    function renderVentas(ventas, clientesMap) {
        const tbody = document.getElementById('ventas-tbody');
        tbody.innerHTML = ''; // Limpiar el contenido anterior

        ventas.forEach(venta => {
            const clienteNombre = clientesMap[venta.clienteId] || 'Desconocido';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${clienteNombre}</td>
                <td>${venta.recibo}</td>
                <td>${venta.fechaVenta}</td>
                <td>${venta.montoTotal}</td>
                <td>${venta.estado ? 'Cerrada' : 'Abierta'}</td>
                <td>
                    <a class="Btn-shadow" onclick="verDetalle(${venta.idVenta})" style="margin-left: 15px;margin-bottom: 15px; float: inline-start;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" class="svgIcon" width="11.25" viewBox="0 0 576 512">
                            <path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                        </svg>
                    </a>
                    <a class="Btn-delete8" href="/VentasUpdate" style="margin-left: 15px;margin-bottom: 15px; float: inline-start;display:none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="10" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
                        </svg>
                    </a>
                    <a class="Btn-download" onclick="Download()" style="margin-left: 15px;margin-bottom: 15px; float: inline-start;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="7.5" viewBox="0 0 384 512">
                            <path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
                        </svg>
                    </a>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    try {
        // Llamada a la API de ventas
        const responseVentas = await fetch(apiUrlVentas);
        const ventas = await responseVentas.json();

        // Llamada a la API de clientes
        const responseClientes = await fetch(apiUrlClientes);
        const clientes = await responseClientes.json();

        // Crear un mapa de clienteId a nombre
        const clientesMap = {};
        clientes.forEach(cliente => {
            clientesMap[cliente.idCliente] = cliente.nombre;
        });

        // Renderizar las ventas con los nombres de los clientes
        renderVentas(ventas, clientesMap);
    } catch (error) {
        console.error('Error al obtener las ventas o los clientes:', error);
    }
});

function verDetalle(idVenta) {
    window.location.href = `/VentasVistas?id=${idVenta}`;
}

// Función para descargar contenido
function Download() {
    console.log('Descargando contenido...');
    let timerInterval;
    Swal.fire({
        title: "¡Alerta de cierre automático!",
        html: "Se cerrará en <b></b> Milisegundos.",
        backdrop: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");

            // Generar y descargar el archivo Excel
            const ventasTable = document.getElementById('ventas-table');
            const ws = XLSX.utils.table_to_sheet(ventasTable);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
            XLSX.writeFile(wb, 'ventas.xlsx');
        }
    });
}
