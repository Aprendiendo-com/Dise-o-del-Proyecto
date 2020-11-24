
login();

$('#cerrar_sesion').on("click", function(){

    if(localStorage.getItem('Token_estudiante') == null)
    {
        localStorage.removeItem('Token_profesor');
        localStorage.removeItem('datosProfesor');
        localStorage.removeItem('ProfesorId');
        localStorage.removeItem('clasesProfesor');
        localStorage.removeItem('cursosProfesor');
        localStorage.removeItem('claseUProfesor');
    }
    else
    {
        localStorage.removeItem('Token_estudiante');
        localStorage.removeItem('datos');
        localStorage.removeItem('EstudianteId');
        localStorage.removeItem('clases');
        localStorage.removeItem('cursos');
        localStorage.removeItem('claseU');
    }


    window.location.href = "./Login.html";

});

function login() {

    if(localStorage.getItem('Token_estudiante') == null)
    {
        var token = DecodeToken(localStorage.getItem('Token_profesor'));
    }
    else
    {
        var token = DecodeToken(localStorage.getItem('Token_estudiante'));
    }
    

    $('#usuario').empty();
    $('#usuario').append(`<i class="far fa-user"></i> ${token.Nombre + " " + token.Apellido}`);
   
}



function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}