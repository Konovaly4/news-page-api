const mongoose = require('mongoose');
const checkValidity = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    required: [true, 'Keyword required'],
  },

  title: {
    type: String,
    minlength: 2,
    required: [true, 'Title required'],
  },

  text: {
    type: String,
    minlength: 2,
    required: [true, 'Text required'],
  },

  date: {
    type: String,
    minlength: 2,
    required: [true, 'Date required'],
  },

  source: {
    type: String,
    minlength: 2,
    required: [true, 'Source required'],
  },

  link: {
    type: String,
    validate: {
      validator: (v) => checkValidity.isURL(v),
      message: 'Article link is incorrect',
    },
    required: [true, 'Article link required'],
  },

  image: {
    type: String,
    validate: {
      validator: (v) => checkValidity.isURL(v),
      message: 'Image link is incorrect',
    },
    required: [true, 'Image link required'],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
