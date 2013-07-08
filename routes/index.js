var blog = require('../controllers/blog')

/*
 * GET home page.
 */

exports.index = function (req, res){
  res.render('home', { title: 'Keep it simple, stupid.' });
};


/*
 * GET blog page.
 */

exports.blog = blog.index;

/*
 * GET post page.
 */

exports.post = blog.post;
