
$(document).ready(function () {


    if (localStorage.getItem('Token_profesor') != null) {
        //cargaCategorias();  //por si no queremos mockear las categorias (?) (hay que tocar backend creoD:)

        $("#form-curso-id").on("submit", function (e) {
            e.preventDefault();
            crearCurso();
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


    function crearCurso() {

        let nombreCurso = $("#inputNombreC").val();
        let categoriaID = $("#opt-categoriaId option:selected").val();
        let descripcion = $("#inputDescripcion").val();
        let imagen = $("#inputImagen").val();
        let cantidad = $("#inputCantidad").val();
        let profesorId = parseInt(localStorage.getItem('ProfesorId'));

        let bodyCurso = {
            "Nombre": nombreCurso,
            "CategoriaId": categoriaID,
            "Descripcion": descripcion,
            "Imagen": imagen,
            "Cantidad": cantidad,
            "ProfesorId": profesorId
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyCurso),
            mode: 'cors'
        };

        fetch('https://localhost:44308/api/Curso', options)
            .then(
                window.location.href = '/pages/VistaProfesorCurso.html'
            )
            .catch(err => console.log('ERROR:' + err));

        return false;

    }



})
