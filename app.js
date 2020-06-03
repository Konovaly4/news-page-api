const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  PORT, SERVERADRESS, mongoConfig, limiter,
} = require('./constants/config');

const finalErr = require('./errors/finalErr');

const app = express();

// mongoose connection
mongoose.connect(`mongodb://${SERVERADRESS}:27017/newsdb`, mongoConfig);

// CORS middleware applying
const whitelist = [
  'http://localhost:8080',
  'http://news-page.gq',
  'https://news-page.gq',
  'https://konovaly4.github.io/news-page-frontend.github.io/',
];
const corsOptions = {
  credentials: true,
  origin: whitelist,
};
app.options('*', cors(corsOptions), (req, res) => {
  res.status(200).send('OK');
});
app.use(cors(corsOptions));

// other app use
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
app.use(finalErr);

// port listening
app.listen(PORT);
