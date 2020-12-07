$(document).ready(function () {

    let cursos = JSON.parse(sessionStorage.getItem("cursos"));

    $.each(cursos, function (index, curso) {
        if (curso.cantidad > 35) {

        }

    })

});