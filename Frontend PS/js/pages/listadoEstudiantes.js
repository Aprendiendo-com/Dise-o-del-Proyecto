$(document).ready(function () {
    
    var seccionList = $('#main');

    var cursoLista = `<div id="seccionListado">
                        <label>Ingrese el ID del curso</label>
                        <input id="inputCurso" type="number"/>
                        <button id="Listar">Listar</button>
                        
                    </div>`;
                    
    seccionList.append(cursoLista);

    
    $("#Listar").on("click",function (){    
        
        if ($.fn.DataTable.isDataTable("#example")) 
        {
            $('#example').DataTable().destroy();
            $('#example').empty();
        }
        else
        {
            $("#seccionListado").append(
                `<table id="example" class="display" style="width:80%">
            </table>`
            )
        }

        let cursoId = $("#inputCurso").val();
        
        $('#example').DataTable( {
            "ajax": {
                "url": "https://127.0.0.1:5001/api/EstudianteCurso/estudiante/"+cursoId,
                "dataSrc": ""
            },
            "columns": [
                { title: "Curso",data: "cursoID" },
                { title: "Nombre",data: "nombre" },
                { title: "Apellido",data: "apellido" },
                { title: "Mail",data: "email" },
                { title: "Estado",data: "estado" },
                { title: "Legajo",data: "legajo" }
            ]
        })
    });

})