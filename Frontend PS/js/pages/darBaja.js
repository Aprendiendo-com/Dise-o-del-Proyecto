$(document).ready(function () {


    $("#modal-darBaja").on("click", function () {

        var modalDarBaja =

            `<div class="modal fade" id="modalReservar" tabindex="-1" aria-labelledby="modalReservarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalReservarLabel">Reservar</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Indique la fecha de reserva:
                        <input type="text" id="fechaReserva" value="" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" id="confirmarReserva" class="btn btn-primary">Reservar</button>
                    </div>
                </div>
            </div>
        </div>`;


        var comentario = $("#inputComentario").val();


        var token = DecodeToken(localStorage.getItem('Token'));

        let Bodycomentario = {
            "foroId": foroID,
            "texto": comentario,
            "nombre": token.Nombre,
            "apellido": token.Apellido,
            "rol": token.Rol
        }


        $("#confirmarBaja").on("click", function () {

            $.ajax({
                url: 'https://localhost:44302/api/EstudianteCurso',
                data: JSON.stringify(Bodycomentario),
                type: "POST",
                dataType: 'JSON',
                contentType: "application/json",


                success: function () {
                    location.reload();
                }
            });

        });

    });