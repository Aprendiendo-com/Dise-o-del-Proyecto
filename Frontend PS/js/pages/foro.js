$(document).ready(function () {
    debugger
    let foroID = 2;


    if(localStorage.getItem('claseU') == null)
    {
        var json = JSON.parse(localStorage.getItem('claseUProfesor'));
        if (json)
        {
            foroID=json.foro.foroId;
        }
        $(".descripcionClase").text(json.foro.texto);
    }
    else
    {

        var json = JSON.parse(localStorage.getItem('claseU'));
        if (json)
        {
            foroID=json.foro.foroId;
        }
        $(".descripcionClase").text(json.foro.texto);

    }
    
//Configuracion de carga de comentarios

    $.ajax({
        type: "GET",
        url: "https://localhost:44308/api/Comentario/GetByForoId?ForoId="+foroID,
        dataType: "json",
        success: function(data) {

            $("tr:has(td)").remove();
            $.each(data, function(i, item) {
                
                var tr = document.createElement('tr');
                var td = document.createElement('td');

                var td1 = document.createElement('td');
                td1.textContent = item.nombre +" "+ item.apellido + ": " + item.texto;
                tr.append(td);
                tr.append(td1);
                $('#tb_comentarios').append(tr);
            });
        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }
    });




//Configuracion de envio de comentarios
    
    var seccionForo = $('#forum-send-coment');

    var claseComentar = `<textarea id="inputComentario" maxlength="200" placeholder="Solo se permiten 200 caracteres "></textarea> 
                        <button id="EnviarComentario" style="float: right;">Enviar</button>`;
                    
    seccionForo.append(claseComentar);

    

    $("#EnviarComentario").on("click",function (){  
        var comentario = $("#inputComentario").val();

        debugger
        if(localStorage.getItem('Token_estudiante') == null)
        {
            var token = DecodeToken(localStorage.getItem('Token_profesor'));
        }
        else
        {
            var token = DecodeToken(localStorage.getItem('Token_estudiante'));
        }

        let Bodycomentario = { 
            "foroId": foroID,
            "texto": comentario,
            "nombre": token.Nombre,
            "apellido": token.Apellido
        }
        
        $.ajax({
            url: 'https://localhost:44308/api/Comentario',
            data: JSON.stringify(Bodycomentario),
            type: "POST",
            dataType: 'JSON',
            contentType: "application/json",
    
    
            success: function() {
                location.reload();
            }
        });

    });


});

$(document).on('click','#ir_contenido', function(){
    if(localStorage.getItem('Token_estudiante') == null)
    {
        window.location.href = "./VistaProfesorCurso.html";
    }
    else
    {
        window.location.href = "./Curso1.html";
    }
})



function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}