const mongoose = require('mongoose');
const checkValidity = require('validator');
const { articleMessages } = require('../constants/errTextLib');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    required: [true, articleMessages.keyword],
  },

  title: {
    type: String,
    minlength: 2,
    required: [true, articleMessages.title],
  },

  text: {
    type: String,
    minlength: 2,
    required: [true, articleMessages.text],
  },

  date: {
    type: String,
    minlength: 2,
    required: [true, articleMessages.date],
  },

  source: {
    type: String,
    minlength: 2,
    required: [true, articleMessages.source],
  },

  link: {
    type: String,
    validate: {
      validator: (v) => checkValidity.isURL(v),
      message: articleMessages.articleLinkIncorrect,
    },
    required: [true, articleMessages.article],
  },

  image: {
    type: String,
    validate: {
      validator: (v) => checkValidity.isURL(v),
      message: articleMessages.imageLinkIncorrect,
    },
    required: [true, articleMessages.image],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
