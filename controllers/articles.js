const Article = require('../models/article');
const NotFoundErr = require('../errors/notFoundErr');

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
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};

module.exports.removeArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id).orFail(new NotFoundErr('Article to remove not found'))
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};
