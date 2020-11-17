
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

            var token = DecodeToken(json);
            var usuarioId = parseInt(token.UsuarioId);

            if(token.Rol == "1")
            {
                localStorage.setItem('Token_profesor', json);
                console.log("el login profesor exitoso");


                 fetch(`http://localhost:51148/api/Profesor/ObtenerIdProfesor?usuarioId= ${usuarioId}`)
                .then(response => response.json())
                .then( data => {
                    
                    localStorage.setItem('ProfesorId', data);
                    window.location.href = './VistaProfesorCurso.html';
                })

            }
            else
            {
                localStorage.setItem('Token_estudiante', json);
                console.log("el login estudiante exitoso");


                 fetch(`http://localhost:51148/api/Estudiante/ObtenerIdEstudiante/${usuarioId}`)
                .then(response => response.json())
                .then( data => {

                    localStorage.setItem('EstudianteId', data);
                    window.location.href='./Curso1.html'
                })
               
            }
        })
        .catch(err => console.log('ERROR:' + err));

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
