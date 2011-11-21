var markdown = require('./lib').markdown,
    spawn = require('child_process').spawn,
    date = spawn('date', ['+%Y-%m-%d %H:%M:%S']),
    fs = require('fs'),
    root = __dirname,
    docs = root + '/docs/',
    home = root + '/!/',
    assets = root + '/assets/',
    files = process.argv.slice(2),
    md_stuffix = '.md',
    html_stuffix = '.html',
    TC_START = [
        'head.html',
        'body_header.html',
        'body_nav.html',
        'body_container.html'],
    TC_END = [
        'body_aside.html',
        'body_footer.html',
        'foot.html'],
    datetime = '',
    DATEREG = /@DATE@/g,
    ENCODING = 'utf8';

function main() {
    date.stdout.setEncoding(ENCODING);
    date.stdout.on('data', function (data) {
        datetime = data.trim();
        files.forEach(function (v, i) {
            convert(v);
        });
    });
}

function convert(file) {
    var filename = docs + file + md_stuffix, tc_start = '', tc_end = '';

    fs.readFile(filename, ENCODING, function (err, data) {
        if (err) {
            return console.log(filename, 'is not find.');
        };
        filename = home + file + html_stuffix;

        TC_START.forEach(function (item) {
            tc_start += fs.readFileSync(assets + item, ENCODING);
        });	

        TC_END.forEach(function (item) {
            tc_end += fs.readFileSync(assets + item, ENCODING);
        });	

        var h = tc_start.replace(DATEREG, datetime)
                + markdown.toHTML(data)
                + tc_end;

        fs.writeFile(filename, h, ENCODING, function (err) {
            if (err) throw err;
            console.log(file + '.md to ' + file + '.html', 'saved.');
        });
    }); 
}

main();
