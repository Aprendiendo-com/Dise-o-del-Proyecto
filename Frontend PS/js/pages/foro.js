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
        url: "https://localhost:44308/api/Comentario/GetByForoId?ForoId="+foroID,
        dataType: "json",
        success: function(data) {

            $("tr:has(td)").remove();
            $.each(data, function(i, item) {
                
                var tr = document.createElement('tr');
                var td = document.createElement('td');

                var td1 = document.createElement('td');
                td1.textContent = item.texto;
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

        let Bodycomentario = { //valor preseteado
            "foroId": foroID,
            "texto": comentario
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