


$('#registrar').on("click", Registrar);

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
      if (response.status == 201) {
        AutoLoguear(_email, _contrasenia);
        return response.json();
      }
      else {
        console.log("Se realizo la peticion pero no devolvio un 201");
      }
    })
    .catch(err => {
      console.log("Ha ocurrido un error con el registro:" + err);
    });
}

function AutoLoguear(correo, contrasenia) {

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


  fetch('https://localhost:44351/api/Usuario/usuario', options)
      .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
              console.log("Ha ocurrido un error al loguearse");
          }
      })
      .then(json => {

          localStorage.setItem('Token', json);
         
          var token = DecodeToken(localStorage.getItem('Token'));
          var estudiante =
          {
            "nombre": $('#nombre').val(),
            "apellido": $('#apellido').val(),
            "email": $('#correo').val(),
            "usuarioId": parseInt(token.UsuarioId),
          };
          var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //"Authorization": "Bearer" + localStorage.getItem("token")
            },
            body: JSON.stringify(estudiante),
            mode: 'cors'
        };
          fetch('https://localhost:44326/api/Estudiante', options)
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('EstudianteId', data[0].estudianteId);
            DerivarUsuario();
          });
          
          return json;
      })
      .catch(err => console.log('Ha ocurrido un error:' + err));
}

function DerivarUsuario(){
  var object_token = DecodeToken(localStorage.getItem('Token'));
  //localStorage.setItem('token', json);
  //sessionStorage.setItem("NombreToken",object_token.Nombre);
  //sessionStorage.setItem("ApellidoToken",object_token.Apellido);
  //sessionStorage.setItem("RolToken",object_token.Rol);
  //sessionStorage.setItem("UsuarioIdToken",object_token.UsuarioId);

  if(object_token.Rol == "2") {

      window.location.href='./Inscripcion.html'
      //a curso 1
  }
}

function DecodeToken(token) {
  var base64Url = (token).split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
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
