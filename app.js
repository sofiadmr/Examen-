// Declaracion de librerias a importar
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Se asignan los puertos o permisos para poder acceder
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }

// Extraemos de express lo necesario
const { json, urlencoded } = express

// Creamos nuestra app apuntando la libreria
const app = express()

// Definimos los puertos y host de la app.
const PORT = process.env.PORT || 3501
const HOST = process.env.HOST || "0.0.0.0"

// Se asignan configuraciones para nuestro server con json
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors(corsOptions))

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
        apikey: '64ra_Cy76s0Q92q8I_J3bmTSzWFraYMODL6Bk0Bt6TZB',
    }),
    serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/fb8d3995-8d51-4b17-9409-b5b3585074fd',
    disableSslVerification: true,
});

// indicamos que usaremos un router
app.post('/tone', async function (req, res, next) {
    try {

        const toneParams = {
            toneInput: req.body,
            contentType: 'application/json',
        };

        const {
            result
        } = await toneAnalyzer.tone(toneParams);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// iniciamos nuestro server
app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); });
