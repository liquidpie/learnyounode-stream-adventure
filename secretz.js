var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var concat = require('concat-stream');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var parser = new tar.Parse();

parser.on('entry', function (e) {
	if (e.type !== 'File')
		return;

	var hash = crypto.createHash('md5', { encoding : 'hex' });
	e.pipe(hash).pipe(concat(function (h) {
		console.log(h + ' ' + e.path);
	}));
});


process.stdin.pipe(decipher)
	.pipe(zlib.createGunzip())
	.pipe(parser);
