const express = require('express');
const path = require('path');
const app = express();
const {config} = require('./config');
const homePageRouter = require('./src/routes/home_page');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', homePageRouter);

app.listen(config.port, config.host, function() {
    console.log(`Listening on port ${config.port} and host ${config.host}`);
});
