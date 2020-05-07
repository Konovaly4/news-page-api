const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorizedErr');
const { authMessages } = require('../constants/errTextLib');

const { JWT_SECRET } = require('../constants/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedErr(authMessages.authRequired);
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedErr(authMessages.authRequired);
  }
  req.user = payload;
  next();
};
