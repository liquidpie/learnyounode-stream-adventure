var tr = require('through2');
var sp = require('split');

var count = 0;

process.stdin.pipe(sp())
	.pipe(tr(function (line, _, next) {
		count += 1;
		if (count % 2 === 0) {
			this.push(line.toString().toUpperCase() + "\n");
		}
		else {
			this.push(line.toString().toLowerCase() + "\n");
		}
		next();
	}))
	.pipe(process.stdout);

