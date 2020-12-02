
$(document).ready(function () {


    if (localStorage.getItem('Token_profesor') != null) {
        //cargaCategorias();  //por si no queremos mockear las categorias (?) (hay que tocar backend creoD:)

        $("#form-curso-id").on("submit", function (e) {
            e.preventDefault();
            crearClase();
        })
    }
    else {
        console.log("No tiene el permiso necesario para realizar el proceso. Si considera que es un error contacte al administrador. Gracias");
    }


    /* function cargaCategorias(){
        var seccionCategoriasId = $('.form-categoriaId');
    
        fetch('https://localhost:44308/api/Curso/ObtenerCategorias')
        .then(response => response.json())
        .then(data => {
    
            localStorage.setItem('categorias', JSON.stringify(data));
    
            $.each(data, function(index, categoria){
    
                var valoresInput = `<option value="${categoria.CategoriaId}">${categoria.Descripcion}</option>`;
                seccionCategoriasId.append(valoresInput);
            })
    })} */


    function crearClase() {

        let nombreClase = $("#inputNombreC").val();
        let descripcion = $("#inputDescripcion").val();
        let video = $("#inputVideo").val();


        let bodyClase = {
            "Nombre": nombreClase,
            "Descripcion": descripcion,
            "Video": video
        
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyCurso),
            mode: 'cors'
        };

        fetch('https://localhost:44308/api/Clase', options)
            .then(
                window.location.href = '/pages/VistaProfesorCurso.html'
            )
            .catch(err => console.log('ERROR:' + err));

        return false;

    }



})
