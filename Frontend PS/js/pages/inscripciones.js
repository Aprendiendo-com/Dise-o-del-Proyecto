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
                                
                                <button type="button" class="btn btn-light btn-sm" >Inscribirse</button>
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