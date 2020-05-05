const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const checkValidity = require('validator');
const UnauthorizedErr = require('../errors/unauthorizedErr');
const { errMessages } = require('../constants/errTextLib');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => checkValidity.matches(v, /[a-zа-яё0-9\s]+/gi),
      message: 'name format is incorrect',
    },
    minlength: 2,
    maxlength: 30,
    required: [true],
  },
  email: {
    type: String,
    unique: [true],
    required: [true],
    validate: {
      validator: (v) => checkValidity.isEmail(v),
      message: 'email format is incorrect',
    },
  },
  password: {
    type: String,
    required: [true],
    minlength: 5,
    select: false,
  },
});

userSchema.statics.findUserByData = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr(errMessages.unauthorized));
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new UnauthorizedErr(errMessages.unauthorized));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
