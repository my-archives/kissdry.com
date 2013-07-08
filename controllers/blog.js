var fs = require('fs')
  , path = require('path')
  , MarkdownReader = require('../lib/yfm');

exports.index = function (req, res) {
  res.render('blog', { title: 'Blog' });
};


exports.post = function (req, res, next) {
  var params = req.params
    , year = params.year
    , month = params.month
    , blogDir = req.app.locals.blogDir
    , title = params.title.toLowerCase()
    , ext = '.md'
    , file = path.join(blogDir, year, month, title + ext);

  fs.exists(file, function (exists) {
    if (!exists) {
      return res.send(404);
    }
    new MarkdownReader(file, function (meta, body) {
      meta.article = body;
      res.render('post', meta);
    });
  });

};
