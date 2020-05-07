/* eslint-disable no-console */
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const {
  PORT = 3000, NODE_ENV, JWT_SECRET, SERVERADRESS,
} = process.env;

const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = { PORT, mongoConfig };
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'test-key';
module.exports.SERVERADRESS = NODE_ENV === 'production' ? SERVERADRESS : 'localhost';
module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
