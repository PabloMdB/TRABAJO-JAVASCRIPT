
"use strict"

//se corrobora el login
const usuarios = [
    {
        "mail": "pablo.marinetti10@gmail.com",
        "nombre": "Pablo",
        "contrasena": 1710
    },
    

]
//creamos una funcion que genere un captcha de letras
function generarCaptcha() {
    const letras = "aAbBcCdDeEfFgGhHiIjJkKlLmMnoOpPqQrRsStTuUvVwWxXyYzZ";
    let password = "";
    for (let i = 0; i < 5; i++) {
        let aleatorio = Math.floor(Math.random() * letras.length);
        password += letras.charAt(aleatorio);
    }
    return password;
}
//cuando cargue el documento "login" se carga el captcha
let nuevoCaptcha = document.getElementById("captcha-generator");
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    nuevoCaptcha.innerHTML = generarCaptcha();
})

//cuando se necesite refrescar el captcha, se hace click en el btn.
let btnRefreshCaptcha = document.getElementById("reload-btn");
btnRefreshCaptcha.addEventListener("click", (e) => {
    e.preventDefault;
    nuevoCaptcha.innerHTML = generarCaptcha();
});

//funcion comprobar captcha. 
let acceso = Boolean;

function comprobar_captcha(captchaActual, captchaIngresado, acceso) {
    if (captchaActual == captchaIngresado) {
        acceso = true;
    } else {
        acceso = false;
    }
    return acceso;
}

//configurar el botón ingresar, para direcciónar a inventario.html.

let btnIngresar = document.getElementById("btnIngresar");
btnIngresar.addEventListener("click", (e) => {
    e.preventDefault();
    //traemos los valores ingresados, usuario, contraseña y captcha.
    let usuario_ingresado = document.getElementById("usuario").value;
    let contrasena_ingresada = document.getElementById("contrasena").value;
    let captchaIngresado = document.getElementById("captchaIngresado").value;
    let captchaActual = document.getElementById("captcha-generator").textContent;

    if (comprobar_captcha(captchaActual, captchaIngresado, acceso) == true) {
        //con el for, busca dentro del arreglo si coinciden los valores usuario y contraseña ingresados.
        if (usuario_ingresado.length && contrasena_ingresada.length) {
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].mail == usuario_ingresado && usuarios[i].contrasena == contrasena_ingresada) {
                    //Guarda el nombre y el log en el localStored
                    const userData = {
                        "logged": "true",
                        "nombre": usuarios[i].nombre
                    };
                    let userString = JSON.stringify(userData);
                    sessionStorage.setItem('login', userString);
                    document.getElementById("aviso").innerHTML = "";
                    window.location.href = "../carpeta-html/inventario.html";
                }
            }

        }else{ 
            document.getElementById("aviso").innerHTML = "Usuario y o contraseña incorrectos. Intente nuevamente." //avisa que hay error
        }
    }else {
        document.getElementById("aviso").innerHTML = "Captcha incorrecto";
    }
})


document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('login')) {
        let userString = sessionStorage.getItem('login');
        let userDatos = JSON.parse(userString);
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '<a class="nav-link" href="inventario.html">Inventario</a>';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<h6 class="m-2">'+userDatos.nombre+'</h6><button class="btn btn-outline-warning" id="salirBtn">Salir</button>';
        //Salir
        let salirBtn = document.getElementById('salirBtn');
        salirBtn.addEventListener('click', function() {
            sessionStorage.removeItem('login');
            window.location.href = "../carpeta-html/inicio.html";
        });
    }else{
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<a class="btn " href="login.html">Ingresar</a>';
    }
});




