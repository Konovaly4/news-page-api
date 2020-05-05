const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const users = require('../controllers/users');
const auth = require('../middlewares/auth');
const routUsers = require('./users');
const routArticles = require('./articles');
const routOther = require('./otherReq');

// request signup routing
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}),
users.login);

// request signin routing
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}),
users.addUser);

// users/cards/other requests routing
router.use('/users', auth, routUsers);

router.use('/articles', auth, routArticles);

router.use('/', routOther);

module.exports = router;
