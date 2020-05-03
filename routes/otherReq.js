const router = require('express').Router();

router.all('/*', (req, res) => {
  res.status(404).json({ message: 'Requesting resourse does not exist' });
});

module.exports = router;
