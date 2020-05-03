const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, addArticle, removeArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().isoDate(),
    source: Joi.string().required().min(2),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}),
addArticle);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().token().min(24),
  }).unknown(true),
}),
removeArticle);

module.exports = router;
