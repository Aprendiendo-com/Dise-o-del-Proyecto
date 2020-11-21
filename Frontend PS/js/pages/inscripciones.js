$(document).ready(function() {
    CargarCursos();
  });

function CargarCursos() {

    var c1 = $('#home');
    var c2 = $('#profile');
    var c3 = $('#contact');

    fetch('https://localhost:44308/api/Curso/GetAll')
    .then(responce => responce.json())
    .then(data => {

        $.each(data, function(index, cursos) {

            if(cursos.categoria == "Programacion")
            {
                var text = `<div class="card d-inline-block" style="width: 18rem;">
                                <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${cursos.nombre} </h5>

                                    <div class = "cont">
                                        <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                        <p> Profesor: ${cursos.profesor}</p>
                                        <div>
                                            <button type="button" class="alta btn btn-light btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                            <button type="button" class="detalles btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = "${cursos.descripcion}"> detalles </button>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>`;
                c1.append(text);
            }
            if(cursos.categoria == "Idiomas")
            {
                var text = `<div class="card d-inline-block" style="width: 18rem;">
                                <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${cursos.nombre} </h5>

                                    <div class = "cont">
                                        <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                        <p> Profesor: ${cursos.profesor}</p>
                                        <div>
                                            <button type="button" class="alta btn btn-light btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                            <button type="button" class="detalles btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = "${cursos.descripcion}"> detalles </button>
                                        </div>

                                    </div>

                                </div>
                            </div>`;
                c2.append(text);
            }
            if(cursos.categoria == "Ciencias exactas")
            {
                var text = `<div class="card d-inline-block" style="width: 18rem;">
                                <img src="${cursos.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${cursos.nombre} </h5>


                                    <div class = "cont">
                                        <span class="badge badge-success"> Capacidad: ${cursos.cantidad}</span>
                                        <p> Profesor: ${cursos.profesor}</p>
                                        <div>
                                            <button type="button" class="alta btn btn-light btn-sm" id = "${cursos.cursoId}"> Inscribirse </button>
                                            <button type="button" class="detalles btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal" id = "${cursos.nombre}" value = "${cursos.descripcion}"> detalles </button>
                                        </div>

                                </div>





                                </div>
                            </div>`;
                c3.append(text);
            }
        });
    });
}

$(document).on('click', '.detalles', function()
{
    $('.modal-body').empty();
    var contenido = $('.modal-body');

    $('#exampleModalLabel').text(this.id);
    var text = `<p> ${this.value}</p>`;

    contenido.append(text);
});


// evento de inscribirse

$(document).on('click', '.alta', function(){

    //var token = DecodeToken(localStorage.getItem('Token'));

    let objeto = {
        "cursoID": parseInt( this.id), //valor preseteado
        "estudianteID": parseInt( localStorage.getItem('EstudianteId')),
        "estado": "En curso"
    }
    debugger
    fetch('http://localhost:51148/api/EstudianteCurso', {
        method: 'POST',
        body: JSON.stringify(objeto), // data can be `string` or {object}!
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("Token_estudiante")
        },
    })
    .then(response => {
        return response.json()
    })
    .then(function(objeto) {
        alert('Incripcion realizada');
    })
    .catch(err => console.log('ERROR: ' + err));
});

$(document).on('click', '#ACursos', function(){
    
    window.location.href = "./Curso1.html";
})



// myform.submit((event) => {
//     event.preventDefault();

//     // Change to your service ID, or keep using the default service
//     var service_id = "default_service";
//     var template_id = "template_3SA9LsqQ";

//     const cargandoGif = document.querySelector('#cargando');
//     cargandoGif.style.display = 'block';

//     const enviado = document.createElement('img');
//     enviado.src = 'img/mail.gif';
//     enviado.style.display = 'block';
//     enviado.width = '150';

//     emailjs.sendForm(service_id, template_id, myform[0])
//         .then(() => {
//             cargandoGif.style.display = 'none';
//             document.querySelector('#loaders').appendChild(enviado);

//             setTimeout(() => {
//                 compra.vaciarLocalStorage();
//                 enviado.remove();
//                 window.location = "index.html";
//             }, 2000);


//         }, (err) => {
//             alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
//             // myform.find("button").text("Send");
//         });

//     return false;

// });

function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}