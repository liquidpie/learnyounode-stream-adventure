var duplexer2 = require('duplexer2');
var through2  = require('through2').obj;

var countFunc = function (counter) {
	var count = {};
	var input = through2(write, end);

	return duplexer2({objectMode : true}, input, counter);
	
	function write(chunk, _, next) {
		count[chunk.country] = (count[chunk.country] || 0) + 1;
		next();
	}

	function end(done) {
		counter.setCounts(count);
		done();
	}
};

module.exports = countFunc;
