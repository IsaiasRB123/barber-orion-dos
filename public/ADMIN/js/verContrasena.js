const pass = document.getElementById("pass"),
        icon = document.querySelector(".bx");

const passDos = document.getElementById("passDos"),

        iconDos = document.querySelector(".bx");

icon.addEventListener("click", e => {
    if (pass.type === "password") {
        pass.type = "text";
        icon.classList.remove('bx bx-show-alt')
        icon.classList.add('bx-hiden')
    }else{
        pass.type= "password"
        icon.classList.add('bx bx-show-alt')
        icon.classList.remove('bx-hiden')
    }

})