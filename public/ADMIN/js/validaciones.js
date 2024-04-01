const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    num: /^[1-9]\d*$/
}

const ValidarFormulario = (e)=>{
    switch (e.target.name) {
        case "observaciones":
            if (expresiones.nombre.test(e.target.value)) {
                
            }else{
                document.getElementById('Pedidos-nombre').classList.add('form_error')
            }
        break;
        case "cantidad":
                console.log('brrr')
        break;
        case "precio":
                console.log('brrr')
        break;
        case "observaciones":
                console.log('brrr')
        break;
        case "observaciones":
                console.log('brrr')
        break;
        case "observaciones":
                console.log('brrr')
        break;
    } 
}



inputs.forEach( (input)=>{
    input.addEventListener('keyup', ValidarFormulario)
    input.addEventListener('blur', ValidarFormulario)
})

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
})