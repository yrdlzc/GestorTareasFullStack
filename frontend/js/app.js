/**
 * ==========================================================
 * SISTEMA DE GESTIÓN DE TAREAS
 * ==========================================================
 *
 * Responsabilidades:
 * - Crear tareas.
 * - Leer tareas.
 * - Actualizar tareas.
 * - Eliminar tareas.
 * ==========================================================
 */

const formulario =
    document.getElementById(
        "form-tarea"
    );

const contenedorTareas =
    document.getElementById(
        "contenedor-tareas"
    );

/**
 * ----------------------------------------------------------
 * ACTUALIZAR TAREA
 * ----------------------------------------------------------
 */
async function editarTarea(
    id,
    tituloActual,
    descripcionActual
) {

    const nuevoTitulo =
        prompt(
            "Nuevo título:",
            tituloActual
        );

    if (
        nuevoTitulo === null ||
        nuevoTitulo.trim() === ""
    ) {

        return;

    }

    const nuevaDescripcion =
        prompt(
            "Nueva descripción:",
            descripcionActual
        );

    if (
        nuevaDescripcion === null ||
        nuevaDescripcion.trim() === ""
    ) {

        return;

    }

    try {

        await fetch(
            `http://localhost:3000/api/tareas/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    titulo:
                        nuevoTitulo,

                    descripcion:
                        nuevaDescripcion

                })

            }
        );

        cargarTareas();

    } catch (error) {

        console.error(error);

        alert(
            "Error al actualizar la tarea."
        );

    }

}

/**
 * ----------------------------------------------------------
 * ELIMINAR TAREA
 * ----------------------------------------------------------
 */
async function eliminarTarea(id) {

    const confirmar =
        confirm(
            "¿Desea eliminar esta tarea?"
        );

    if (!confirmar) {

        return;

    }

    try {

        await fetch(
            `http://localhost:3000/api/tareas/${id}`,
            {
                method: "DELETE"
            }
        );

        cargarTareas();

    } catch (error) {

        console.error(error);

        alert(
            "Error al eliminar la tarea."
        );

    }

}

/**
 * ----------------------------------------------------------
 * OBTENER TAREAS
 * ----------------------------------------------------------
 */
async function cargarTareas() {

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/api/tareas"
            );

        const tareas =
            await respuesta.json();

        contenedorTareas.innerHTML = "";

        if (tareas.length === 0) {

            contenedorTareas.innerHTML = `
                <p class="mensaje-carga">
                    No existen tareas registradas.
                </p>
            `;

            return;

        }

        tareas.forEach((tarea) => {

            contenedorTareas.innerHTML += `

                <div
                    class="tarjeta-tarea"
                    data-id="${tarea._id}">

                    <h3>
                        ${tarea.titulo}
                    </h3>

                    <p>
                        ${tarea.descripcion}
                    </p>

                    <div class="acciones-tarea">

                        <button
                            class="btn-editar"
                            onclick="editarTarea(
                                '${tarea._id}',
                                '${tarea.titulo}',
                                '${tarea.descripcion}'
                            )">

                            Editar

                        </button>

                        <button
                            class="btn-eliminar"
                            onclick="eliminarTarea(
                                '${tarea._id}'
                            )">

                            Eliminar

                        </button>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

/**
 * ----------------------------------------------------------
 * CREAR TAREA
 * ----------------------------------------------------------
 */
formulario.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const titulo =
            document
                .getElementById("titulo")
                .value
                .trim();

        const descripcion =
            document
                .getElementById("descripcion")
                .value
                .trim();

        if (
            titulo === "" ||
            descripcion === ""
        ) {

            alert(
                "Todos los campos son obligatorios."
            );

            return;

        }

        const nuevaTarea = {

            titulo,
            descripcion

        };

        try {

            const respuesta =
                await fetch(
                    "http://localhost:3000/api/tareas",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            nuevaTarea
                        )
                    }
                );

            await respuesta.json();

            formulario.reset();

            cargarTareas();

        } catch (error) {

            console.error(error);

            alert(
                "Error al crear la tarea."
            );

        }

    }
);

/**
 * ----------------------------------------------------------
 * CARGA INICIAL
 * ----------------------------------------------------------
 */
cargarTareas();