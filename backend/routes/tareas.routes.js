/**
 * ==========================================================
 * RUTAS DE TAREAS
 * ==========================================================
 *
 * Responsabilidades:
 * - Obtener tareas.
 * - Crear tareas.
 * - Actualizar tareas.
 * - Eliminar tareas.
 * ==========================================================
 */

const express = require("express");

const router = express.Router();

const {

    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea

} = require(
    "../controllers/tareaController"
);

/**
 * ----------------------------------------------------------
 * OBTENER TAREAS
 * ----------------------------------------------------------
 */
router.get(
    "/",
    obtenerTareas
);

/**
 * ----------------------------------------------------------
 * CREAR TAREA
 * ----------------------------------------------------------
 */
router.post(
    "/",
    crearTarea
);

/**
 * ----------------------------------------------------------
 * ACTUALIZAR TAREA
 * ----------------------------------------------------------
 */
router.put(
    "/:id",
    actualizarTarea
);

/**
 * ----------------------------------------------------------
 * ELIMINAR TAREA
 * ----------------------------------------------------------
 */
router.delete(
    "/:id",
    eliminarTarea
);

module.exports = router;