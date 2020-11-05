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
                                
                            <button onclick="Inscripcion();" type="button" class="inscribirse btn btn-light btn-sm" id="${cursos.cursoId}">Inscripcion</button>

                                <button type="button" class="detalles btn btn-primary btn-sm"  data-toggle="modal" data-target="#exampleModal" value = "${cursos.descripcion}id="${cursos.cursoId}"> Ver detalles</button>
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



function Inscripcion() {
     let objeto = {
         "cursoId":10,
         "estudianteID": 5,
         "estado": "recursa"
 }
 debugger
        fetch('https://localhost:44326/api/EstudianteCurso', {
                method: 'POST',
                body: JSON.stringify(objeto),

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
            console.log(objeto); alert("Incripcion realizada");
  
}

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

