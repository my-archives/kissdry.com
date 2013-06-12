
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Keep it simple, stupid.' });
};
