/**
 * ==========================================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ==========================================================
 */

const Usuario = require("../models/Usuario");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/**
 * ----------------------------------------------------------
 * REGISTRO DE USUARIO
 * ----------------------------------------------------------
 */
const registrarUsuario = async (req, res) => {

    try {

        const {
            nombre,
            correo,
            password
        } = req.body;

        const existeUsuario =
            await Usuario.findOne({
                correo
            });

        if (existeUsuario) {

            return res.status(400).json({

                mensaje:
                    "El usuario ya existe."

            });

        }

        const salt =
            await bcrypt.genSalt(10);

        const passwordHash =
            await bcrypt.hash(
                password,
                salt
            );

        const nuevoUsuario =
            new Usuario({

                nombre,
                correo,
                password:
                    passwordHash

            });

        await nuevoUsuario.save();

        res.status(201).json({

            mensaje:
                "Usuario registrado correctamente."

        });

    } catch (error) {

        res.status(500).json({

            mensaje:
                "Error al registrar usuario."

        });

    }

};

/**
 * ----------------------------------------------------------
 * LOGIN
 * ----------------------------------------------------------
 */
const loginUsuario = async (req, res) => {

    try {

        const {
            correo,
            password
        } = req.body;

        const usuario =
            await Usuario.findOne({
                correo
            });

        if (!usuario) {

            return res.status(400).json({

                mensaje:
                    "Credenciales incorrectas."

            });

        }

        const passwordValido =
            await bcrypt.compare(
                password,
                usuario.password
            );

        if (!passwordValido) {

            return res.status(400).json({

                mensaje:
                    "Credenciales incorrectas."

            });

        }

        const token =
            jwt.sign(
                {
                    id: usuario._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

        res.json({

            mensaje:
                "Inicio de sesión correcto.",

            token

        });

    } catch (error) {

        res.status(500).json({

            mensaje:
                "Error al iniciar sesión."

        });

    }

};

/**
 * ----------------------------------------------------------
 * EXPORTACIÓN
 * ----------------------------------------------------------
 */
module.exports = {

    registrarUsuario,
    loginUsuario

};