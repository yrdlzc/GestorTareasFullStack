/**
 * ==========================================================
 * PROYECTO FULL STACK
 * SISTEMA DE GESTIÓN DE TAREAS
 * ==========================================================
 */

require("dotenv").config();

console.log("PORT =", process.env.PORT);
console.log("JWT =", process.env.JWT_SECRET);
console.log("MONGO =", process.env.MONGODB_URI);

/**
 * ----------------------------------------------------------
 * DEPENDENCIAS
 * ----------------------------------------------------------
 */
const express = require("express");
const cors = require("cors");
const path = require("path");

/**
 * ----------------------------------------------------------
 * CONFIGURACIÓN
 * ----------------------------------------------------------
 */
const conectarDB = require("./config/db");

/**
 * ----------------------------------------------------------
 * RUTAS
 * ----------------------------------------------------------
 */
const tareasRoutes = require("./routes/tareas.routes");

const authRoutes = require("./routes/auth.routes");

/**
 * ----------------------------------------------------------
 * APP
 * ----------------------------------------------------------
 */
const app = express();

/**
 * ----------------------------------------------------------
 * CONEXIÓN A MONGODB
 * ----------------------------------------------------------
 */
conectarDB();

/**
 * ----------------------------------------------------------
 * PUERTO
 * ----------------------------------------------------------
 */
const PORT = process.env.PORT || 3000;

/**
 * ----------------------------------------------------------
 * MIDDLEWARES
 * ----------------------------------------------------------
 */
app.use(cors());

app.use(express.json());

/**
 * ----------------------------------------------------------
 * ARCHIVOS ESTÁTICOS
 * ----------------------------------------------------------
 */
app.use(
    express.static(
        path.join(
            __dirname,
            "../frontend"
        )
    )
);

/**
 * ----------------------------------------------------------
 * RUTAS API
 * ----------------------------------------------------------
 */
app.use(
    "/api/tareas",
    tareasRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

/**
 * ----------------------------------------------------------
 * RUTA PRINCIPAL
 * ----------------------------------------------------------
 */
app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});

/**
 * ----------------------------------------------------------
 * INICIO DEL SERVIDOR
 * ----------------------------------------------------------
 */
app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );

});