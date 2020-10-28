$(document).ready(function () {
    
    var seccionList = $('.centro');

    var cursoLista = `<div id="seccionListado" style="margin: 2rem">
                        <label>Ingrese el ID del curso</label>
                        <input id="inputCurso" type="number"/>
                        <button id="Listar">Listar</button>                        
                    </div>
                    <br>`;
                    
    seccionList.append(cursoLista);

    
    $("#Listar").on("click",function (){    
        
        if ($.fn.DataTable.isDataTable("#listaAlumnos")) 
        {
            $('#listaAlumnos').DataTable().destroy();
            $('#listaAlumnos').empty();
        }
        else
        {
            $("#seccionListado").append(
                `<div style="margin: 1.5rem">
                    <table id="listaAlumnos" class="display" style="width:100%">
                    </table>
                </div>`
            )
        }

        let cursoId = $("#inputCurso").val();
        
        $('#listaAlumnos').DataTable( {
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