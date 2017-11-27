var through = require('through2');
var tr = through(function write(buffer, encoding, next) {
	this.push(Buffer.from(buffer.toString().toUpperCase(), 'utf8'));
	next();
}, function end(done) {
	done();
});

process.stdin.pipe(tr).pipe(process.stdout);
