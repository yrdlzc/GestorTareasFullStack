/**
 * ==========================================================
 * CONTROLADOR DE TAREAS
 * ==========================================================
 *
 * Responsabilidades:
 * - Obtener tareas.
 * - Crear tareas.
 * - Actualizar tareas.
 * - Eliminar tareas.
 * ==========================================================
 */

const Tarea = require("../models/Tarea");

/**
 * ----------------------------------------------------------
 * OBTENER TODAS LAS TAREAS
 * ----------------------------------------------------------
 */
const obtenerTareas = async (req, res) => {

    try {

        const tareas = await Tarea.find();

        res.status(200).json(tareas);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener las tareas"
        });

    }

};

/**
 * ----------------------------------------------------------
 * CREAR TAREA
 * ----------------------------------------------------------
 */
const crearTarea = async (req, res) => {

    try {

        const nuevaTarea = new Tarea(
            req.body
        );

        const tareaGuardada =
            await nuevaTarea.save();

        res
            .status(201)
            .json(tareaGuardada);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear la tarea"
        });

    }

};

/**
 * ----------------------------------------------------------
 * ACTUALIZAR TAREA
 * ----------------------------------------------------------
 */
const actualizarTarea = async (req, res) => {

    try {

        const { id } = req.params;

        const tareaActualizada =
            await Tarea.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true
                }
            );

        res.status(200).json(
            tareaActualizada
        );

    } catch (error) {

        res.status(500).json({
            mensaje:
                "Error al actualizar la tarea."
        });

    }

};

/**
 * ----------------------------------------------------------
 * ELIMINAR TAREA
 * ----------------------------------------------------------
 */
const eliminarTarea = async (req, res) => {

    try {

        const { id } = req.params;

        await Tarea.findByIdAndDelete(
            id
        );

        res.status(200).json({
            mensaje:
                "Tarea eliminada correctamente."
        });

    } catch (error) {

        res.status(500).json({
            mensaje:
                "Error al eliminar la tarea."
        });

    }

};

/**
 * ----------------------------------------------------------
 * EXPORTACIÓN DE FUNCIONES
 * ----------------------------------------------------------
 */
module.exports = {

    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea

};