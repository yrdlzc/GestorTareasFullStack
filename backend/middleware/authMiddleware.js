/**
 * ==========================================================
 * MIDDLEWARE JWT
 * ==========================================================
 */

const jwt = require("jsonwebtoken");

const verificarToken = (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                mensaje:
                    "Acceso denegado. Token requerido."

            });

        }

        const token =
            authHeader.replace(
                "Bearer ",
                ""
            );

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.usuario =
            decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            mensaje:
                "Token inválido."

        });

    }

};

module.exports =
    verificarToken;