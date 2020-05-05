const Article = require('../models/article');
const NotFoundErr = require('../errors/notFoundErr');
const BadRequestErr = require('../errors/badRequestErr');
const ForbiddenErr = require('../errors/forbiddenErr');
const { errMessages } = require('../constants/errTextLib');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id }).orFail(new NotFoundErr(errMessages.noArticles))
    .populate('owner')
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.message.includes('article validation failed')) {
        return next(new BadRequestErr(err.message));
      }
      next(err);
    });
};

module.exports.checkOwner = (req, res, next) => {
  Article.findById(req.params.id).orFail(new NotFoundErr(errMessages.noArticleToRemove))
    .populate('owner')
    .then((article) => {
      if (article.owner.id !== req.user._id) {
        throw new ForbiddenErr(errMessages.cantRemoveArticle);
      }
      next();
    })
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
    .populate('owner')
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};
