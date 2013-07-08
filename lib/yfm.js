/**
 * YMAL Front Matter.
 */

var fs = require('fs')
  , EOL = require('os').EOL
  , Transform = require('stream').Transform
  , marked = require('marked')
  , YAML_SEPARATOR = /^---\s*$/;


module.exports = MarkdownReader;


/**
 * Read file line by line.
 */

function createReadLiner() {
  var liner = new Transform({ objectMode: true });

  liner._transform = function(chunk, encoding, done) {
    var data = chunk.toString()
    if (this._lastLineData) data = this._lastLineData + data

    var lines = data.split(EOL)
      , len = lines.length;
    this._lastLineData = lines.splice(--len, 1)[0]

    --len;
    lines.forEach(function push(chunk, i) {
      (i < len) && (chunk += EOL);
      liner.push(chunk);
    });

    done()
  };

  liner._flush = function(done) {
    if (this._lastLineData) this.push(this._lastLineData)
    this._lastLineData = null
    done()
  };

  return liner;
}


function MarkdownReader(file, cb) {
  var self = this;
  var stream = fs.createReadStream(file, {
      fd        : null,
      flags     : 'r',
      encoding  : 'utf8'
    })
  , liner = createReadLiner()
  , header = ''
  , body = ''
  , recording = 1
  , line;

  stream.pipe(liner);

  liner.on('readable', function (a) {
    while ((line = liner.read())) {
      if (recording && YAML_SEPARATOR.test(line)) {
        recording = recording === 1 ? 2 : 0;
      } else if (recording === 2) {
        header += line;
      } else {
        body += line;
      }
    }
  });

  stream.once('end', function () {
    var meta = self.parseMeta(header);
    var content = self.parseBody(body);
    cb.call(self, meta, content);
  });
};

/**
 * Parse YAML-Front-Matter.
 *
 * Syntqx:
 *
 * ---
 * layout: post
 * title: Hello
 * author:  U0391
 * description: My first post.
 * date: 2013-07-06 02:22:33
 * lang: en
 * slug: -
 * updated: 2013-07-07 17:18:33
 * permalink: http://xx.xx
 * tags: [ js, css ]
 * categories: [ life, programming ]
 * ---
 */

MarkdownReader.prototype.parseMeta = function (header) {
  var lines = header.split(EOL);
  var meta = {};
  lines.forEach(function (line, i) {
    var i = line.indexOf(':')
      , key = line.substr(0, i).trim()
      , value = line.substr(i + 1).trim();

    if (value.charAt(0) === '[' && value.charAt(value.length - 1) === ']') {
      value = value.substr(1, value.length - 2).split(',');
      value = value.map(function (v) {
        return v.trim();
      });
    }

    if (key) {
      meta[key] = value;
    }
  });

  return meta;
};

MarkdownReader.prototype.parseBody = function (body) {
  return marked(body);
};
