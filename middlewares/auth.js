const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorizedErr');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedErr('authorization required');
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedErr('authorization required');
  }
  req.user = payload;
  next();
};
