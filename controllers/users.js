const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictErr = require('../errors/conflictErr');
const BadRequestErr = require('../errors/badRequestErr');

const { JWT_SECRET } = require('../config');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
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
    .catch((err) => {
      if (err.message.includes('duplicate key error') && err.message.includes('email')) {
        return next(new ConflictErr('Email is already exists'));
      }
      if (err.message.includes('user validation failed')) {
        return next(new BadRequestErr(err.message));
      }
      next(err);
    });
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

module.exports.logout = (req, res, next) => {
  return User.findById(req.user._id)
    .then(() => {
      res.clearCookie('jwt', {
        httpOnly: true,
      })
        .end();
    })
    .catch(next);
};
