$(document).ready(function () {

fetch('http://example.com/movies.json')
    .then(response => response.json())










//Configuracion de envio de comentarios
    
    var seccionForo = $('.centro');

    var cursoComentar = `<div id="seccionListado" style="margin: 2rem">
                        <label>Envíe un comentario</label>
                        <input id="inputComentario" type="text"/>
                        <button id="Enviar">Enviar</button>                        
                    </div>
                    <br>`;
                    
    seccionForo.append(cursoComentar);
    
    $("#Enviar").on("click",function (){    
        
        





    });


})