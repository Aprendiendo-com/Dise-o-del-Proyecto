$(document).ready(function () {

    let foroID = 2;
    var json = JSON.parse(localStorage.getItem('claseU'));
    if (json)
    {
        foroID=json.foro.foroId;
    }
    
//Configuracion de carga de comentarios

    $.ajax({
        type: "GET",
        url: "https://localhost:5001/api/EstudianteCurso/cursos/"+foroID, //ruta de ejemplo
        dataType: "json",
        success: function(data) {

            $("tr:has(td)").remove();
            $.each(data, function(i, item) {
                
                var tr = document.createElement('tr');
                var td = document.createElement('td');

                var td1 = document.createElement('td');
                td1.textContent = item.estado;
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

    var comentario = $("#inputComentario").val();
    var foroId = 1;

    $("#EnviarComentario").on("click",function (){    
        $.ajax({
            url: 'https://localhost:44xxx/api/Comentario?'+foroId,
            data: JSON.stringify(comentario),
            type: "POST",
            dataType: 'JSON',
            contentType: "application/json",
    
    
            success: function() {
                location.reload();
            }
        });

    });


});