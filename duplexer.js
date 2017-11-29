var spawn = require('child_process').spawn;
var duplexer2 = require('duplexer2');

var cmd_process = function (cmd, args) {
	var spawned_process = spawn(cmd, args);
	return duplexer2({objectMode : true}, spawned_process.stdin, spawned_process.stdout);
}

module.exports = cmd_process;
