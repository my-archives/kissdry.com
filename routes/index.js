
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home', { title: 'Keep it simple, stupid.' });
};
