const errMessages = {
  noArticles: 'there is no articles',
  noArticleToRemove: 'Article to remove not found',
  cantRemoveArticle: 'You can not remove this article',
  existingEmail: 'Email is already exists',
  unauthorized: 'Wrong email or password',
};

const articleMessages = {
  keyword: 'Keyword required',
  title: 'Title required',
  text: 'Text required',
  date: 'Date required',
  source: 'Source required',
  arctile: 'Article link required',
  image: 'Image link required',
  articleLinkIncorrect: 'Article link is incorrect',
  imageLinkIncorrect: 'Article link is incorrect',
};

const userMessages = {
  nameIncorrect: 'name format is incorrect',
  emailIncorrect: 'email format is incorrect',
};

const authMessages = {
  authRequired: 'authorization required',
};

module.exports = {
  errMessages, articleMessages, userMessages, authMessages,
};
