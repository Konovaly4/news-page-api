const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, mongoConfig, limiter } = require('./constants/config');

const errMiddleware = require('./errors/finalErrMidlleware');

const app = express();

// mongoose connection
mongoose.connect('mongodb://localhost:27017/newsdb', mongoConfig)
  .then(() => console.log('Connect to database'))
  .catch((err) => console.log(err.message));

// app additional middlewares usage
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// request logger
app.use(requestLogger);

// temporary crash-test middleware
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});


app.use('/', require('./routes/index'));

// error logger
app.use(errorLogger);

// error middlewares
// Joi error middleware
app.use(errors());

// final error middleware
// eslint-disable-next-line no-unused-vars
app.use(errMiddleware);

// port listening
app.listen(PORT);
