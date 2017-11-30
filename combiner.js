var combine = require('stream-combiner');
var split = require('split');
var through = require('through2');
var zlib = require('zlib');

var combineFunc = function() {
	var grouper = through(write, end);
	var current;

	return combine(split(), grouper, zlib.createGzip());

	function write(line, _, next) {
		if (line.length === 0) {
			return next();
		}

		var row = JSON.parse(line);
		if (row.type === "genre") {
			if (current) {
				this.push(JSON.stringify(current) + "\n");
			}
			current = { name : row.name, books : [] };
		}
		else if (row.type === "book") {
			current.books.push(row.name);
		}
		next();
	}

	function end(done) {
		if (current) {
			this.push(JSON.stringify(current) + "\n");
		}
		done();
	}

}

module.exports = combineFunc;
