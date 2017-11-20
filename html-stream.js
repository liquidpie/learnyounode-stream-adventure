var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();

var stream = tr.select('.loud').createStream();
var thr = through(function write(buf, _, next) {
	this.push(buf.toString().toUpperCase());
	next();
}, 
	function end(done) {
	done();
});

stream.pipe(thr).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);

