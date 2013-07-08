var parseURL = require('url').parse
  , SLASH = '/';

module.exports = function (req, res, next) {
  var method = req.method.toLowerCase()
    , routes   = req.app.routes[method];

  if (!routes) { return next(); }
 
  var url = parseURL(req.url)
    , pathname = url.pathname
    , search = url.search || ''
    , hasSlash = pathname.charAt(pathname.length - 1) === SLASH
    , match;

  // Adjust the URL's path by either adding or removing a trailing slash.
  !hasSlash && (pathname += SLASH);

  // Look for matching route.
  match = routes.some(function (r) {
    return r.match(pathname);
  });

  if (match) {
    res.redirect(301, pathname + search);
  } else {
    next();
  }
};
