$(document).ready(function(){

    if(localStorage.getItem('datosProfesor') == null)
    {
        traerDatos_del_profesor();
    }
    else
    {
        debugger
    
        
        var elemento = $('#clases');
        elemento.empty();
    
        $.each( JSON.parse( localStorage.getItem('clasesProfesor')) , function(index, cla){
    
            var text = `<li class="nav-item">
                        <a href="#" class="Nclases nav-link text-dark bg-light" id = "${cla.descripcion}">
                            <i class="fas fa-pencil-alt"></i>
                                ${cla.descripcion}
                        </a>
                    </li>`;
    
            elemento.append(text);
        })

        ///////////////////////////////


        var listaClases = JSON.parse(localStorage.getItem('claseUProfesor'));
        var contenido = $('.centro');
    
        contenido.empty();
    
        var principal = `<div class="texto" style="border-bottom-style: double; border-width: 1px;">
                            <h4> ${listaClases.descripcion} </h4>
                        </div>
    
                        <div class = "texto principal" style= "margin-top: 5%;"> <p> ${listaClases.tema} </p> </div>
                        
    
                        <div class="texto" >
                                   <div class="embed-responsive embed-responsive-16by9">
                                        <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                               </div>
                        `;
    
        contenido.append(principal);


    }

});

async function traerDatos_del_profesor() {
    
    var id = parseInt( localStorage.getItem('ProfesorId'));

    await fetch(`http://localhost:51148/api/Profesor/${id}`)
    .then(responce => responce.json())
    .then(data => {

        localStorage.setItem('datosProfesor', JSON.stringify(data));

        var lcursos = $('#cursos');

        $.each(data, function(index, cursos){

            var textCursos = ` <a class="dropdown-item bg-light" href="#" id = "${cursos.nombre}"> ${cursos.nombre}</a>`;

            lcursos.append(textCursos);
        });
    })
}

$(document).on('click','.dropdown-item', function(){

    var json = JSON.parse(localStorage.getItem('datosProfesor'));

    var cursos = json.find(x => x.nombre == this.id);

    var clases = cursos.clasesNavegacion;

    // guardo las clases en el local

    localStorage.setItem('clasesProfesor', JSON.stringify(clases));
    localStorage.setItem('cursosProfesor', JSON.stringify(cursos));
    var elemento = $('#clases');
    elemento.empty();

    $.each(clases, function(index, cla){

        var text = `<li class="nav-item">
                    <a href="#" class="Nclases nav-link text-dark bg-light" id = "${cla.descripcion}">
                        <i class="fas fa-pencil-alt"></i>
                            ${cla.descripcion}
                    </a>
                </li>`;

        elemento.append(text);
    })
});

$(document).on('click','.Nclases', function(){

    var listaClases = JSON.parse(localStorage.getItem('clasesProfesor')).find(x => x.descripcion == this.id);
    localStorage.setItem('claseUProfesor', JSON.stringify(listaClases));
    var contenido = $('.centro');

    contenido.empty();

    var principal = `<div class="texto" style="border-bottom-style: double; border-width: 1px;">
                        <h4> Este es el titulo de la clase </h4>
                    </div>

                    <div class = "texto principal" style= "margin-top: 5%;"> <p> ${listaClases.tema} </p> </div>
                    

                    <div class="texto" >
                               <div class="embed-responsive embed-responsive-16by9">
                                    <iframe width="560" height="315" src="${listaClases.video.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                           </div>
                    `;

    contenido.append(principal);
});



function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}