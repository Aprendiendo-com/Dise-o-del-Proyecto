$(document).ready(function () {

    $('.texto-modal').empty();
    if (localStorage.getItem('cursos') != null) {

        let datoCurso = JSON.parse(localStorage.getItem('cursos'));

        let cursoDesc = $('#modalBajaBody');

        let htmlBase = `<p class="texto-modal"> ${datoCurso.nombre} </p>`;

        cursoDesc.append(htmlBase);

        var estudianteId = parseInt(localStorage.getItem('UsuarioId'));

        let Bodycomentario = {
            "estudianteId": estudianteId,
            "cursoId": datoCurso.cursoId
        }


        $("#confirmarBaja").on("click", function () {

            $.ajax({
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("Token")
                },
                mode: 'cors',
                url: `https://localhost:44302/api/EstudianteCurso?estudianteId=${estudianteId}&cursoId=${datoCurso.cursoId}`,
                type: "DELETE",


                success: function (data) {
                    localStorage.removeItem('cursos');
                    localStorage.removeItem('clases');
                    localStorage.removeItem('datos'); //corregir el setitem de datos
                    location.reload();

                }
            });


        });
    }

});
