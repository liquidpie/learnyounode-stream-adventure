var concat = require('concat-stream');
var cc = concat(function (body) {
	var s = body.toString();
	process.stdout.write(s.split("").reverse().join(""));
	process.stdout.write('\n');
});
process.stdin.pipe(cc);
