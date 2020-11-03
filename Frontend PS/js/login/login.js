window.onload = () => {
    $('#ingresar').on("click", Ingresar);
}
/*
window.onunload = () =>{ 
    window.localStorage.clear;
    window.localStorage.removeItem('token'); 
};*/
/*
window.onbeforeunload = function() { 
    window.localStorage.removeItem('token');
};*/
function Ingresar() {
    var correo = document.getElementById("correo-login").value;
    var contrasenia = document.getElementById("contrasenia-login").value;
    var usuario = new RequestUsuarioLogin(correo,contrasenia);

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //"Authorization": "Bearer" + localStorage.getItem("token")
        },
        body: JSON.stringify(usuario),
        mode: 'cors'
    };
    //console.log(usuario);

    fetch('https://localhost:44351/api/Usuario/usuario', options)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("ERROR");
                const error = new Error(response.error);
                throw error;
            }
        })
        .then(json => {
            localStorage.setItem('Token', json);
            DerivarUsuario();
            return json;
        })
        .catch(err => console.log('ERROR:' + err));
        
}

function DerivarUsuario(){
    var object_token = DecodeToken(localStorage.getItem('Token'));
    //localStorage.setItem('token', json);
    sessionStorage.setItem("NombreToken",object_token.Nombre);
    sessionStorage.setItem("ApellidoToken",object_token.Apellido);
    sessionStorage.setItem("RolToken",object_token.Rol);
    sessionStorage.setItem("UsuarioIdToken",object_token.UsuarioId);
    //console.log(object_token);
    if(object_token.Rol == "Profesor") {
        console.log("Es un profesor");
        //window.location.href= './listadoEstudiantes.html'
    }
    else if(object_token.Rol == "Estudiante") {
        console.log("Es un alumno");
        window.location.href='./Inscripcion.html'
        //a curso 1
    }
}

function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

class RequestUsuarioLogin {
    constructor(email, contraseña) {
        this.email = email,
            this.contraseña = contraseña
    }
}
