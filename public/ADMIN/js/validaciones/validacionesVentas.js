
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    // Aquí podrías agregar las expresiones regulares para validar los campos
}

const campos = {
    nombre: true,
}

function generarPrecioAleatorio(min, max) {
    const precio = Math.random() * (max - min) + min;
    return Math.round(precio * 100) / 100;
}

const GuardarVenta = async (e) => {
    if (campos.nombre) {
        const nombre = document.getElementById('nombre').value;
        const recibo = Math.floor(100000 + Math.random() * 900000);
        const fecha_venta = new Date().toISOString(); // Aseguramos el formato correcto de la fecha
        const montoTotal = generarPrecioAleatorio(1000, 1000000);
        const estado = true;

        const data = {
            clienteId: parseInt(nombre), // Aseguramos que clienteId sea un número
            recibo: recibo.toString(), // Aseguramos que el recibo sea una cadena
            fechaVenta: fecha_venta,
            montoTotal: montoTotal,
            estado: estado
        };

        console.log('Datos a enviar:', data); // Verifica los datos antes de enviarlos

        try {
            const response = await fetch('http://localhost:5235/api/Venta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la solicitud:', errorData);
                throw new Error('Error en la solicitud: ' + (errorData.message || 'No se pudo completar la solicitud'));
            }

            Swal.fire({
                icon: "success",
                title: "Venta registrada correctamente",
                showConfirmButton: false,
                timer: 1500,
                backdrop: false
            }).then(() => {
                window.location.href = '/Ventas';
            });
        } catch (error) {
            console.error('Error al guardar la venta:', error);
            Swal.fire({
                icon: "error",
                text: "Llena todos los campos para realizar el registro",
                backdrop: false
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            text: "Llena todos los campos para realizar el registro",
            backdrop: false
        });
    }
}

