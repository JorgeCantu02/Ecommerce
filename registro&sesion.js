
//Funcion que registra al usuario pára poder iniciar sesion

function registro() {
    var usuario = document.getElementById("usuario1").value;
    var contrasena = document.getElementById("contrasena1").value;
    document.cookie = "usuario=" + usuario;
    document.cookie = "contrasena=" + contrasena;
    swal("Registro exitoso");

    window.opener = self.AbortController;
    self.window.close;
}

//Funcion que recibe los datos del registro para poder validar y asi iniciar sesion exitosamente

function inicioSesion() {
    var usuario = document.getElementById("usuario2").value;
    var contrasena = document.getElementById("contrasena2").value;
    var usuarioCookie = getCookie("usuario");
    var contrasenaCookie = getCookie("contrasena");
    if (usuario == usuarioCookie && contrasena == contrasenaCookie) {
        swal("Inicio de sesión exitoso");
        traslado = open("index.html");
    } else {
        swal("Usuario o contraseña incorrectos");
    }

    window.opener = self.AbortController;
    self.window.close;
}

//funcion que toma los valores y los guarda en una cookie

function getCookie(usuario) {
    var valor = "; " + document.cookie;
    var partes = valor.split("; " + usuario + "=");
    if (partes.length == 2) {
        return partes.pop().split(";").shift();
    }
}
