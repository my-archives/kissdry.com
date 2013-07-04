if (process.env.NEW_RELIC_HOME) {
  require('newrelic');
}

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')

  , config = require('./config')
  , middleware = require('./lib/middleware');

var app = express();


// -- Config -----------------------------------------------------------------

app.set('name', 'Kissdry');
app.set('env', config.env);
app.set('port', config.port);
app.enable('strict routing');

app.set('view engine', 'jade');
app.set('views', config.dirs.views);

app.locals({
    site              : 'Kissdry'
  , copyright_year    : '2013'

  , version           : config.version

  , isDevelopment     : config.isDevelopment
  , isProduction      : config.isProduction
  , livereload        : config.isDevelopment && config.livereload

  // set layouts & partials basedir
  , basedir           : config.dirs.base

  , ga                : config.isProduction && config.ga

  , mixpanel          : config.isProduction && config.mixpanel
});


// -- Middleware --------------------------------------------------------------

app.use(express.favicon());
//app.use(express.favicon(path.join(config.dirs.pub, 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.session());
app.use(app.router);
app.use(express.static(config.dirs.pub));

// error handle  - 404
app.use(middleware.notfound);

// development only
if (config.isDevelopment) {
  app.locals.compileDebug = true;
  app.locals.pretty = true;
  app.use(express.errorHandler({
      dumpExceptions: true
    , showStack     : true
  }));
} else {
  app.use(middleware.error);
}


// -- Routes -----------------------------------------------------------------

app.get('/', routes.index);


// -- Server -----------------------------------------------------------------

http.createServer(app).listen(config.port, function(){
  console.log('Express server listening on port ' + config.port);
});
