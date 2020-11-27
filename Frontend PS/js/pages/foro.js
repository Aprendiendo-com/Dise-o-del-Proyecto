$(document).ready(function () {
    debugger
    let foroID = 2;
    
    var json = JSON.parse(localStorage.getItem('claseU'));

    if (json)
    {
        foroID=json.foro.foroId;
    }
    $(".descripcionClase").text(json.foro.texto);

    
//Configuracion de carga de comentarios

    $.ajax({
        type: "GET",
        url: "https://localhost:44308/api/Comentario/GetByForoId?ForoId="+foroID,
        dataType: "json",
        success: function(data) {

            debugger
            $("tr:has(td)").remove();
            $.each(data, function(i, item) {

                if(item.rol == "1")
                {
                    var html = `<tr>
                                <td> <i class=" icono fas fa-user-check"></i>${item.nombre} ${item.apellido} : ${item.texto} </td>
                            </tr>`;
                }
                else
                {
                    var html = `<tr>
                                <td> <i class="icono fas fa-user-graduate"></i>${item.nombre} ${item.apellido} : ${item.texto} </td>
                            </tr>`;
                }
                //var tr = document.createElement('tr');
                //var td = document.createElement('td');

                //var td1 = document.createElement('td');
                //td1.textContent = item.nombre +" "+ item.apellido + ": " + item.texto;
                //tr.append(td);
                //tr.append(td1);
                $('#tb_comentarios').append(html);
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
                        <button id="EnviarComentario" style="float: right;" type="button" class="btn btn-info"> Enviar </button> `;
                    
    seccionForo.append(claseComentar);

    

    $("#EnviarComentario").on("click",function (){  
        var comentario = $("#inputComentario").val();
        
        var token = DecodeToken(localStorage.getItem('Token'));

        let Bodycomentario = { 
            "foroId": foroID,
            "texto": comentario,
            "nombre": token.Nombre,
            "apellido": token.Apellido,
            "rol": token.Rol
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


function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}