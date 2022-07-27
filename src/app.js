const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js')
const passport= require('passport')
const cookieSession = require('cookie-session')

require('./db.js');

const server = express();
const cors = require('cors')
server.set('view engine','ejs')
server.name = 'API';

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
next()
});

// Initializes passport and passport sessions

server.use('/', routes);

// Error catching endware
server.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || error;

    res.status(status).send(message);
});

module.exports = server;