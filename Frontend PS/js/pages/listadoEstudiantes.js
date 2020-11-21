$(document).ready(function () {
    
    var seccionList = $('.centro');

    var cursoLista = `<div id="seccionListado" style="margin: 2rem">
                        <label>Listado de alumnos</label>                
                    </div>
                    <br>`;
                    
    seccionList.append(cursoLista);

        
        
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

        let cursoId = JSON.parse(localStorage.getItem('cursosProfesor')).cursoId;
        
        $('#listaAlumnos').DataTable( {
            "ajax": {
                "headers": {'Authorization': 'Bearer '+ localStorage.getItem('Token_profesor')},
                "url": "http://localhost:51148/api/EstudianteCurso/estudiante/"+cursoId,
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
    
})