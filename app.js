// Declaracion de librerias a importar
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Se asignan los puertos o permisos para poder acceder
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }

// Apuntar al archivo de rutas
const router = require('./routes');

// Extraemos de express lo necesario
const { json, urlencoded } = express

// Creamos nuestra app apuntando la libreria
const app = express()

// Definimos los puertos y host de la app.
const PORT = process.env.PORT || 3500
const HOST = process.env.HOST || "0.0.0.0"

// Se asignan configuraciones para nuestro server con json
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors(corsOptions))

// indicamos que usaremos un router
app.use(router)

// iniciamos nuestro server
app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); });
