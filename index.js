const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const ErrorHandler = require('./util/ErrorHandler');

const app = express();


app.use(express.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

app.use(morgan('dev'));

app.use(helmet());


RouteV1(app);

//error handler
app.use(ErrorHandler);

module.exports = app;