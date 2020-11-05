$(document).ready(function() {
    CargarCursos();
  });


function CargarCursos() {

    var main = $('#main');

    fetch('https://localhost:44308/api/Curso/GetAll')
    .then(responce => responce.json())
    .then(data => {


        $.each(data, function(index, cursos) {

            var card = `
            <div class="card mb-3 d-inline-block" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Unaj.jpg" class="card-img" alt="Imagen de un curso">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title"> ${cursos.nombre} </h4>

                            <span class="badge badge-success"> Cupos: ${cursos.cantidad}</span>
                            <div class = "tramite">
                                
                                <button type="button" class="alta btn btn-light btn-sm" id = "${cursos.cursoId}">Inscribirse</button>
                                <button type="button" class="detalles btn btn-primary btn-sm"  data-toggle="modal" data-target="#exampleModal" value = "${cursos.descripcion}"> Ver detalles</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                    
            main.append(card);

        });
    })
}

$(document).on('click', '.detalles', function()
{
    $('.modal-body').empty();
    var contenido = $('.modal-body');

    var text = `<p> ${this.value}</p>`;

    contenido.append(text);
});



$(document).on('click', '.alta', function(){

    let objeto = {
        "cursoID": this.id, //valor preseteado
        "estudianteID": 1,
        "estado": "En curso"
    }
    debugger
    fetch('https://localhost:5001/api/EstudianteCurso', {
        method: 'POST',
        body: JSON.stringify(objeto), // data can be `string` or {object}!
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
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

