var markdown = require('Markdown'),
    fs = require('fs'),
    root = __dirname,
    docs = root + '/docs/',
    home = root + '/~/',
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
		'foot.html'];

function main() {
    files.forEach(function (v, i) {
        convert(v);
    });
}

function convert(file) {
    var filename = docs + file + md_stuffix, tc_start = '', tc_end = '';

    fs.readFile(filename, 'utf-8', function (err, data) {
        if (err) {
            return console.log(filename, 'is not find.');
        };
        filename = home + file + html_stuffix;

		TC_START.forEach(function (item) {
			tc_start += fs.readFileSync(assets + item, 'utf-8');
		});	

		TC_END.forEach(function (item) {
			tc_end += fs.readFileSync(assets + item, 'utf-8');
		});	

        fs.writeFile(filename, tc_start + markdown.parse(data) + tc_end, function (err) {
            if (err) throw err;
            console.log(file + '.md to ' + file + '.html', 'saved.');
        });
    }); 
}

main();
