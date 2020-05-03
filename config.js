/* eslint-disable no-console */
require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

const mongoConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = { PORT, mongoConfig };
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'test-key';
