
    $('#ingresar').on("click", Ingresar);

/*
window.onunload = () =>{ 
    window.localStorage.clear;
    window.localStorage.removeItem('token'); 
};*/
/*
window.onbeforeunload = function() { 
    window.localStorage.removeItem('token');
};*/
async function Ingresar() {

    // funcion de login

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

    await fetch('https://localhost:44351/api/Usuario/usuario', options)
        .then((response) => response.json())
        .then(json => {

            localStorage.setItem('Token', json);
            console.log("el login fue correcto");
        })
        .catch(err => console.log('ERROR:' + err));




        // funcion de buscar la id del estudiante o alumno

        var object_token = DecodeToken(localStorage.getItem('Token'));

        var usuarioId = parseInt(object_token.UsuarioId);

        await fetch(`http://localhost:51148/api/Estudiante/ObtenerIdEstudiante/${usuarioId}`)
        .then(response => response.json())
        .then( data => {
            
            localStorage.setItem('EstudianteId', data);
        })


        // se lo manda a la pagina correspondiente
        if(object_token.Rol == "1") {

            console.log("Es un profesor");
        }
        if(object_token.Rol == "2") {
    
            window.location.href='./Curso1.html'
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
