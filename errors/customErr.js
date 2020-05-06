const { errMessages } = require('../constants/errTextLib');
const ConflictErr = require('./conflictErr');
const BadRequestErr = require('./badRequestErr');

module.exports = (err, next) => {
  if (err.message.includes('duplicate key error') && err.message.includes('email')) {
    return next(new ConflictErr(errMessages.existingEmail));
  }
  if (err.message.includes('user validation failed')) {
    return next(new BadRequestErr(err.message));
  }
  if (err.message.includes('Validation failed')) {
    return next(new BadRequestErr(err.message));
  }
  if (err.message.includes('article validation failed')) {
    return next(new BadRequestErr(err.message));
  }
  return next(err);
};
