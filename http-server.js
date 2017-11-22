var tr = require('through2');
var http = require('http');

function write(buf, _, next) {
	this.push(buf.toString().toUpperCase());
	next();
}

function end(done) {
	done();
}

var server = http.createServer(function (req, res) {
	if (req.method === 'POST') {
		req.pipe(tr(write, end)).pipe(res);
	}	
});

server.listen(+process.argv[2]);
