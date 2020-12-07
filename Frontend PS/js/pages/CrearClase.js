
$("#EnviarClase").on("click", function () {
    debugger
    crearClase();
})


    function crearClase() {

        var video = {
            "descripcion": $('#inputDescVideo').val(),
            "link": $('#inputVideo').val()
        }

        var foro = {
            "foroId": JSON.parse(localStorage.getItem('claseU')).foro.foroId,
            "texto": $('#inputForo').val()
        }

        let bodyClase = {

            "descripcion": $("#inputDescripcion").val(),
            "cursoId": JSON.parse(localStorage.getItem('claseU')).cursoId,
            "tema": $("#inputTema").val(),
            "video": video,
            "foro": foro
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyClase),
            mode: 'cors'
        };

        fetch('https://localhost:44308/api/Clase', options)
            .then( response => response.json())
            .then( data => {
                localStorage.setItem('ClaseCreadaId', data.claseId);

                window.location.href = './crearCuestionario.html'
            })
            .catch(err => console.log('ERROR:' + err));

    }
