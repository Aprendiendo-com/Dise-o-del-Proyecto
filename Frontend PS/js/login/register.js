
window.onload = () => {
  $('#registrar').on("click", Registrar);
}

//EN LA VALIDACION COMPROBAR QUE EL CORREO NO ESTÉ REGISTRADO EN LA BD
function Registrar() {
  var _nombre = document.getElementById("nombre").value;
  var _apellido = document.getElementById("apellido").value;
  var _email = document.getElementById("correo").value;
  var _contrasenia = document.getElementById("contraseña").value;
  
  var usuario = new RequestUsuario(_nombre, _apellido, _email, 2,  _contrasenia);
 
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //"Authorization": "Bearer" + localStorage.getItem("token")
    },
    body: JSON.stringify(usuario),
    mode: 'cors'
  };
  fetch('https://localhost:44351/api/Usuario', options)
    .then(response => {
      return response.json()
    })
    .then(function (usuario) {
      console.log("Registro exitoso");
      alert("AUTOLOGUEAR");
      AutoLoguear(_email,_contrasenia);
      window.location.href= "./inscripcion.html"
    })
    .catch(err => console.log('ERROR:' + err));

}


class RequestUsuario {
  constructor(nombre, apellido, email, rolId, contrasenia) {
    this.nombre = nombre,
      this.apellido = apellido,
      this.email = email,
      this.rolid = rolId;
    this.contraseña = contrasenia
  }
}

class RequestUsuarioLogin {
  constructor(email, contraseña) {
      this.email = email,
          this.contraseña = contraseña
  }
}




function AutoLoguear(correo, contrasenia) {
  console.log(correo);
  console.log(contrasenia);
  alert("LLEGA A LA FUNCION AUTOLOGUEAR");
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

  debugger;
  fetch('https://localhost:44351/api/Usuario/usuario', options)
      .then((response) => {
        alert("ENTRA AL FETCH");
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
          console.log(json);
          alert("OBTIENE EL TOKEN");
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
  
  console.log(object_token.Rol);
  alert("LLEGA HASTA DERIVAR");

  if(object_token.Rol == "Estudiante") {
      console.log("Es un alumno");
      alert("Derivar a inscripción");
      window.location.href='./Inscripcion.html'
      //a curso 1
  }
}

function DecodeToken(token) {
  var base64Url = (token).split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}