import {
    CuestionarioTodoDTO,
    CuestionarioACorregirDTO,
    RespuestaAlumnoDTO,
    Registro
} from "./Constant.js";

import * as CuestionarioService from "./CuestionarioService.js";
import * as RegistroService from "./RegistroService.js";

window.onload = () => {
    CargarCuestionario();
    $('#enviar-cuestionario').on("click", EnviarCuestionario); //CUANDO RECIBE POR PARÁMETRO ENTRA DIRECTO
}

function CargarCuestionario() {
    if(localStorage.getItem('claseU')){
        var idClase = JSON.parse(localStorage.getItem('claseU')).claseId;
    }
    else{
        var idClase = 1;
    }
    CuestionarioService.default( idClase ).then(x => LoadCuestionario(x));
}

function LoadCuestionario(CuestionarioTodoDTO) {
    window.sessionStorage.setItem("idClase", CuestionarioTodoDTO.claseId);

    var informacion = document.getElementById("main-grid");
    informacion.innerHTML += `<div class="info-cuestionary" id="header-cuestionario"> ${CuestionarioTodoDTO.descripcion}</div>`;

    var i = 1;
    var lista = [];
    
    var valorPregunta = Math.round(10/CuestionarioTodoDTO.preguntas.length * 100) / 100;
    CuestionarioTodoDTO.preguntas.forEach(preguntas => {

       informacion.innerHTML += `<div class="filas">
       <div class="info" id=${"info"+i}>${"Pregunta por: "+ valorPregunta + "pts."}</div>
       <div class="pregyresp-grid" id=${i}>
       <div class="pregunta" id="preguntaId">
       <label for="preg" id="preguntaLabelInicio"> ${("Pregunta "+ i + "- ")} </label>
       <label for="preg" id="preguntaLabelDescripcion"> ${(preguntas.descripcion)} </label>
       </div>`;

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

    //SETEAR DESDE EL LOCALSTORAGE
    var alumno = 1;
    RegistroService.default().then(x => RevisarRegistro(x, CuestionarioTodoDTO.claseId, alumno));
    //LO ACABO DE COMENTAR
}

function RevisarRegistro(registro, claseId, estudianteId) {
    //TAMBIÉN DESHABILITAR SI NO HAY UN ESTUDIANTE
    console.log(sessionStorage.getItem("UsuarioIdToken"));
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

    debugger
    var lista = JSON.parse(localStorage.getItem("ListaDimensiones"));
    var cuestionario_respuestas = new CuestionarioACorregirDTO;
    cuestionario_respuestas.respuestas = [];
    for (var i = 1, length = lista.length; i < length + 1; i++) {
        //cuestionario_respuestas.cuestionarioId = 11; //CAMBIAR ESTO
        cuestionario_respuestas.claseId = sessionStorage.getItem("idClase"); //CAMBIAR ESTO
        var respuesta_descripcion = new RespuestaAlumnoDTO($(`input[name=${"respuesta"+i}]:checked`).val())
        cuestionario_respuestas.respuestas.push(respuesta_descripcion);
    }

    //MANDAR EL CUESTIONARIO A LA API
    //console.log(JSON.stringify(cuestionario_respuestas));
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

function agregarCalificacion(resolucion) {
    console.log(resolucion);
    var informacion = document.getElementById("header-cuestionario");
    informacion.innerHTML += `<div class="calificacion"> ${("--> CALIFICACION: " + resolucion.calificacionTotal +"/10 <--")} </div>`;
    

    //MODIFICADO
    var i = 1;
    resolucion.respuestas.forEach(respuesta => {
        if(respuesta.respuestaAlumno == respuesta.respuestaCorrecta){
            var informacion = document.getElementById("info"+i);
            informacion.innerHTML += `</br><div class="info-estado-correcto"> Estado: Correcta </div>`;
            console.log("CORRECTA");
        }
        else{
            var informacion = document.getElementById("info"+i);
            informacion.innerHTML += `</br><div class="info-estado-incorrecto"> Estado: Incorrecta </div>`;
            console.log("FALSA");
        }
        i++;
    })
    //END
    RegistrarCalificacion(resolucion);
}

function RegistrarCalificacion(resolucion){
    var idClase = sessionStorage.getItem("idClase");
    var alumno = 1;
    var registro = new Registro(alumno,idClase,resolucion.calificacionTotal);

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

function DeshabilitarBoton(){
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



