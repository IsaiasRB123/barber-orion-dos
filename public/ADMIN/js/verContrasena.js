
function togglePassword(fieldId, icon) {
    const field = document.getElementById(fieldId);
    const fieldType = field.getAttribute('type');
    if (fieldType === 'password') {
      field.setAttribute('type', 'text');
      icon.classList.remove('bx-show-alt');
      icon.classList.add('bx-hide');
    } else {
      field.setAttribute('type', 'password');
      icon.classList.remove('bx-hide');
      icon.classList.add('bx-show-alt');
    }
  }
// const passDos = document.getElementById("passDos"),
//         iconDos = document.querySelector(".bx");

// iconDos.addEventListener("click", e => {
//     if (pass.type === "password") {
//         pass.type = "text";
//         icon.classList.remove('bx bx-show-alt')
//         icon.classList.add('bx-hiden')
//     }else{
//         pass.type= "password"
//         icon.classList.add('bx bx-show-alt')
//         icon.classList.remove('bx-hiden')
//     }

// })
