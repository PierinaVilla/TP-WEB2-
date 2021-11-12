"use strict";

// document.addEventListener("DOMContentLoaded", iniciarPagina);

// function iniciarPagina() {


const API_URL = `http://localhost/TRABAJOPRACTICOESPECIALWEB2/api/comentarios`;

const form_comentarios = document.querySelector("#form-comentarios");

document.querySelector("#btn-comentar").addEventListener("click", añadirComentario);



/*GET*/
async function cargaComentarios() {

    try {

        let id_materia = form_comentarios.getAttribute('data-idMateria');
        let response = await fetch(`api/comentarios/materia/${id_materia}`);
        if (response.ok) {
            let comentarios = await response.json();
            mostrarTabla(comentarios);
        } else {
            console.log("Error - Failed URL!");
        }
    } catch (error) {
        console.log("Connection error");
    }


}
cargaComentarios();

/*POST*/
async function añadirComentario() {
    let objeto = crearComentario();
    try {
        let respuesta = await fetch(`${API_URL}}`, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(objeto)
        })
        if (respuesta.ok) {
            console.log("http 200");
            cargaComentarios(`${API_URL}/materia/${id_materia}`);
            mostrarTabla(objeto);
        } else if (respuesta.status == 201) {
            console.log("http 201");
        } else {
            console.log("http error");
        }
    } catch (error) {
        console.log(error);
    }
}

function crearComentario() {
    let formData = new FormData(form_comentarios);
    let comentario = formData.get('comentario');
    let puntaje = formData.get('puntaje');
    let id_usuario = formData.get('data-idUsuario');
    let id_materia = formData.get('data-idMateria');



    let comment = {
        "comentario": comentario,
        "puntaje": puntaje,
        "id_materia": id_materia,
        "id_usuario": id_usuario

    };
    return comment;
}

function mostrarTabla(comentarios) {
    console.log(comentarios);
    let tbody = document.querySelector('#tbody');
    for (let comentario of comentarios) {

        // let tbody = document.querySelector('#tbody');
        let filas = document.createElement('tr');

        let celda_nombre = document.createElement('td');
        let celda_comentario = document.createElement('td');
        let celda_puntaje = document.createElement('td');

        let celda_borrar = document.createElement('td');


        let btnBorrar = document.createElement('button');

        celda_nombre.innerHTML = comentario.nombre;
        celda_comentario.innerHTML = comentario.comentario;
        celda_puntaje.innerHTML = comentario.puntaje;

        btnBorrar.innerHTML = "Borrar";

        btnBorrar.setAttribute('data-id', comentario.id);

        btnBorrar.classList.add('btn-borrar');

        filas.appendChild(celda_nombre);
        filas.appendChild(celda_comentario);
        filas.appendChild(celda_puntaje);


        filas.classList.add(`fila-${comentario.id}`);

        filas.appendChild(celda_borrar);
        celda_borrar.appendChild(btnBorrar);
        tbody.appendChild(filas);

    }
    let botonesBorrar = document.querySelectorAll(".btn-borrar");
    botonesBorrar.forEach(e => {
        e.addEventListener("click", borrar);
    });
}



    // async function borrar() {
    //     let id = this.getAttribute("data-id");
    //     try {
    //         let response = await fetch(`api/comentarios/${id}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });

    //         if (response.ok) {
    //             cargacomentarios(`api/comentarios/materia/${id_materia}`);

    //         } else {
    //             console.log("No se pudo eliminar");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     cargacomentario(`api/comentarios/materia/${id_materia}`);
    // }
// }