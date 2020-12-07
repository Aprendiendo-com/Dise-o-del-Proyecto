import {
    CuestionarioTodoDTO,
    CuestionarioACorregirDTO,
    RespuestaAlumnoDTO,
    Registro,
    PreguntaConRespuestaAlumnoDTO
} from "./Constant.js";

import * as CuestionarioService from "./CuestionarioService.js";
import * as RegistroService from "./RegistroService.js";

window.onload = () => {

    var token = DecodeToken(localStorage.getItem('Token'));

    if(token.Rol == "1")
    {
        var element = $('#cambiante');

        var text = `<li class="secciones nav-item">
                        <button type="button"  style="margin-top: 3%;" id = "editar" class="btn btn-light btn-sm" style="margin-top: 5%;"> <i class="fas fa-plus"></i> Editar cuestionario </button>
                    </li>`;

        element.append(text);
    }
    

    CargarCuestionario();
    $('#enviar-cuestionario').on("click", EnviarCuestionario); //CUANDO RECIBE POR PARÁMETRO ENTRA DIRECTO
}

$(document).on('click', '#editar', function(){
    window.location.href = "./editCuestionario.html";
});



function CargarCuestionario() {
    if (localStorage.getItem('claseU')) {
        var idClase = JSON.parse(localStorage.getItem('claseU')).claseId;
        //idClase = 1;
    } else {
        var idClase = 1;
    }
    console.log(parseInt(localStorage.getItem('UsuarioId')));
    
    CuestionarioService.default(idClase).then(x => LoadCuestionario(x));
}

function LoadCuestionario(CuestionarioTodoDTO) {
    window.sessionStorage.setItem("idClase", CuestionarioTodoDTO.claseId);

    var informacion = document.getElementById("main-grid");
    informacion.innerHTML += `<div class="info-cuestionary" id="header-cuestionario"> ${CuestionarioTodoDTO.descripcion}</div>`;

    var i = 1;
    var lista = [];

    var lista_preguntas = [];
    CuestionarioTodoDTO.preguntas.forEach(preguntas => {
        lista_preguntas.push(preguntas);
        informacion.innerHTML += `<div class="filas">
       <div class="pregyresp-grid" id=${i}>
       <div class="pregunta" id=${"preguntaId"+i}>
        <div class="info-valor">
       <label for="preg" id="preguntaLabelInicio"> ${("Pregunta "+ i + "- ")} </label>
       <label for="preg" id="preguntaLabelDescripcion"> ${(preguntas.descripcion)+" ("+preguntas.calificacionParcial+"Pts)"} </label>
       </div>
       <div class="estado" id=${"estado"+i}>
        </div>
       </div>`;
        /*class="estado"
               <i class="false fas fa-times"></i>
               <i class="correct fas fa-check-circle"></i>

        */
        var j = 1;
        var lista_respuestas = [];
        preguntas.respuestas.forEach(respuestas => {
            lista_respuestas.push(j);
            var informacion2 = document.getElementById(i);
            informacion2.innerHTML += `<div class="respuesta-grid" id="respuesta">
            <div class="radio-button"><input type="radio" name=${"respuesta"+i} value="${respuestas.descripcion}"></div>
            <div class="respuesta"><label class="radio"> ${respuestas.descripcion}</label></div>
            </div>
            `;
            j++;
        })
        informacion.innerHTML += `
        </div>
        </div>`
        lista.push(lista_respuestas);
        i++;
    })

    localStorage.setItem('ListaDimensiones', JSON.stringify(lista));
    sessionStorage.setItem('preguntas', JSON.stringify(lista_preguntas));
    //SETEAR DESDE EL LOCALSTORAGE
    RegistroService.default().then(x => RevisarRegistro(x, CuestionarioTodoDTO.claseId, parseInt(localStorage.getItem('UsuarioId'))));
    //LO ACABO DE COMENTAR
}

function RevisarRegistro(registro, claseId, estudianteId) {
    //TAMBIÉN DESHABILITAR SI NO HAY UN ESTUDIANTE

    registro.forEach(reg => {
        if (reg.claseId == claseId && reg.estudianteId == estudianteId) {
            DeshabilitarOpciones();
            DeshabilitarBoton();
            var informacion = document.getElementById("header-cuestionario");
            informacion.innerHTML += `<div class="calificacion"> ${("COMPLETADO CON CALIFICACION: " + reg.calificacion+"/10")} </div>`;

        }
    })
}

function EnviarCuestionario() {
    var cuestionario_respuestas = new CuestionarioACorregirDTO;
    cuestionario_respuestas.preguntas = [];
    cuestionario_respuestas.claseId = sessionStorage.getItem("idClase"); //CAMBIAR ESTO
    var lista_preguntas = [];
    var preguntas = JSON.parse(sessionStorage.getItem('preguntas'));
    var i = 1;
    var respondido = true;
    preguntas.forEach(pregunta => {
        var respuesta_seleccion = new RespuestaAlumnoDTO($(`input[name=${"respuesta"+i}]:checked`).val())
        if(respuesta_seleccion.descripcion == undefined){
            respondido = false;
        }
        var pregunta_con_respuesta = new PreguntaConRespuestaAlumnoDTO(
            pregunta.descripcion, pregunta.calificacionParcial, respuesta_seleccion);
        lista_preguntas.push(pregunta_con_respuesta);
        i++;
    })

    cuestionario_respuestas.preguntas = lista_preguntas;

    /*console.log(JSON.stringify(cuestionario_respuestas));*/


    //MANDAR EL CUESTIONARIO A LA API
    if(respondido) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer" + localStorage.getItem("token")
            },
            body: JSON.stringify(cuestionario_respuestas),
            mode: 'cors'
        };
    
        fetch('https://localhost:44326/api/Cuestionario/Resolucion', options)
            .then(response => {
                return response.json()
            })
            .then(json => {
                agregarCalificacion(json);
                DeshabilitarOpciones();
                DeshabilitarBoton();
                return json;
            })
            .catch(err => console.log('ERROR: ' + err))
    }
    else{
        Swal.fire({
            type: 'error',
            title: 'Responda a todas las preguntas',
            /*text: 'Responda a todas las preguntas',*/
            showConfirmButton: true,
            confirmButtonColor: '#48D1CC'
        })
    }

}

function agregarCalificacion(resolucion) {
    var informacion = document.getElementById("header-cuestionario");
    informacion.innerHTML += `<div class="calificacion"> ${("--> CALIFICACION: " + resolucion.calificacionTotal +"/10 <--")} </div>`;

    //MODIFICADO
    var i = 1;
    resolucion.respuestas.forEach(respuesta => {
        if (respuesta.respuestaAlumno == respuesta.respuestaCorrecta) {
            var informacion = document.getElementById("estado" + i);
            informacion.innerHTML += `<i class="correct fas fa-check-circle"></i>`;
            console.log("CORRECTA");
        } else {
            var informacion = document.getElementById("estado" + i);
            informacion.innerHTML += `<i class="false fas fa-times"></i>`;
            console.log("FALSA");
        }
        i++;
    })
    //END
    RegistrarCalificacion(resolucion);
    
    

}

function RegistrarCalificacion(resolucion) {
    var idClase = sessionStorage.getItem("idClase");
    var registro = new Registro(parseInt(localStorage.getItem('UsuarioId')), idClase, resolucion.calificacionTotal);

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + localStorage.getItem("token")
        },
        body: JSON.stringify(registro),
        mode: 'cors'
    };

    fetch('https://localhost:44326/api/Registro/PostConClase', options)
        .then(response => {
            return response.json()
        })
        .then(json => {
            return json;
        })
        .catch(err => console.log('ERROR: ' + err))
}

function DeshabilitarBoton() {
    document.getElementById("enviar-cuestionario").disabled = true;
}

function DeshabilitarOpciones() {
    var lista = JSON.parse(localStorage.getItem("ListaDimensiones"));

    var i = 1;
    lista.forEach(preguntas => {
        var j = 0;
        preguntas.forEach(respuestas => {
            document.getElementsByName("respuesta" + i)[j].disabled = true;
            j++
        })
        i++;
    })

}


function DecodeToken(token) {
    var base64Url = (token).split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}