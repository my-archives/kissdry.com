var env  = process.env
  , path = require('path');

module.exports = Object.freeze({
    env             : env.NODE_ENV
  , isDevelopment   : env.NODE_ENV !== 'production'
  , isProduction    : env.NODE_ENV === 'production'

  , livereload      : Object.freeze({
      port          : 35729
    })

  , port            : env.PORT || 3000

  , version         : require('../package').version

  , dirs: Object.freeze({
        pub         : path.resolve('public/')
      , base        : path.resolve('views/')
      , views       : path.resolve('views/pages/')
      , layouts     : path.resolve('views/layouts/')
      , partials    : path.resolve('views/partials/')
    })

  , ga              : 'UA-41848961-1'
});
