const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const NotFoundErr = require('../errors/notFoundErr');

const { JWT_SECRET } = require('../config');

module.exports.getUser = (req, res, next) => {
  User.find(req.user._id)
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      return User.create({
        name, email, password: hash,
      })
        .then((user) => {
          res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByData(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
        .end();
    })
    .catch(next);
};
