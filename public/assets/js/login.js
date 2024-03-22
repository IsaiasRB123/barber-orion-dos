const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
})

function validateSignUp() {
    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (fullName === '' || phoneNumber === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Por favor complete todos los campos.');
        return false; // Evitar el envío del formulario
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false; // Evitar el envío del formulario
    }

    // Puedes agregar más validaciones según tus necesidades aquí

    return true; // Permitir el envío del formulario
}