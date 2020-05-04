const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser, logout } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}),
updateUser);

router.post('/me/signout', logout);

module.exports = router;
