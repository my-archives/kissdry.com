'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  /*
  grunt-contrib-clean
  grunt-contrib-stylus
  grunt-contrib-watch
  grunt-contrib-cssmin
  grunt-contrib-livereload;
  grunt-devtools

  // for express
  grunt-express-server

  // for connect
  grunt-contrib-connect
  */

  var isProduction = !grunt.option('debug');

  grunt.initConfig({

    // express
    express: {
      options: {
        script: 'app.js'
      }
    , dev: {
      options: {
        script: 'app.js'
      }
    }
    , prod: { }
    }

    // watch
  , watch: {
      options: {
        //debounceDelay: 500,
        nospawn: true,
        livereload: true,
        interrupt: true
      }
    , jade: {
        files: ['views/{,*/}*.jade']
      , options: {
          nospawn: false
        }
      }
    , stylus: {
        files: ['stylus/{,*/}*.{styl,css}']
      , tasks: ['stylus:compile']
      }
    , express: {
        files:  ['app.js']
      , tasks:  ['express:dev', 'livereload']
      }
    }

    // clean
  , clean: {
      dist: [
        'public/stylus/main.css'
      ]
    }

    // stylus
  , stylus: {
      compile: {
        options: {
          'compress': isProduction
        }
      , files: {
          'public/styles/main.css': 'stylus/main.styl'
        }
      }
    }

    // cssmin
  , cssmin: {
      options: {
        report: 'min'
      }
    , minify: {
        expand: true
      , cwd: 'public/styles'
      , src: ['*.css']
      , dest: 'public/styles'
      , ext: '.css'
      }
    }

  });

  // server
  grunt.registerTask('server', ['express:dev', 'watch']);

  // build
  grunt.registerTask('build', 'Build all files.', function () {
    grunt.task.run('build:' + (isProduction ? 'prod' : 'dev'));
  });
  // build dev
  grunt.registerTask('build:dev', [
      'clean:dist'
    , 'stylus:compile'
  ]);

  // build prod
  grunt.registerTask('build:prod', [
      'clean:dist'
    , 'stylus:compile'
    , 'cssmin:minify'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
