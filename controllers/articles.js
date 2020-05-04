const Article = require('../models/article');
const NotFoundErr = require('../errors/notFoundErr');
const BadRequestErr = require('../errors/badRequestErr');
const ForbiddenErr = require('../errors/forbiddenErr');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id }).orFail(new NotFoundErr('there is no articles'))
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

module.exports.removeArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
    .populate('owner')
    .then((article) => {
      if (!article) {
        return Promise.reject(new NotFoundErr('Article to remove not found'));
      }
      if (article.owner._id !== req.user._id) {
        return Promise.reject(new ForbiddenErr('You can not remove this article'));
      }
      res.status(200).send({ data: article });
    })
    .catch(next);
};
