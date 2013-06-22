module.exports = function (req, res, next) {
  res.status(404);
  res.render('404.jade', { title: 'Sorry, page not found.' });
};
